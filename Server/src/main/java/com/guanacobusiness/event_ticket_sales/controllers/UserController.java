package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedUser;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.services.UserXPermitService;
import com.guanacobusiness.event_ticket_sales.utils.PageDTOMapper;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;
import com.guanacobusiness.event_ticket_sales.utils.UserMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    UserService userService;

    @Autowired
    UserXPermitService userXPermitService;

    @Autowired
    private StringToUUID stringToUUID;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PageDTOMapper pageDTOMapper;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){

        Page<User> users = userService.findAll(page, size);

        if(users.isEmpty() || users == null){
            return new ResponseEntity<>("No Users Found", HttpStatus.NOT_FOUND);
        }

        List<FormatedUser> formatedUsers = userMapper.map(users.getContent());
        PageDTO<FormatedUser> response = pageDTOMapper.map(formatedUsers, users);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody PasswordUpdateDTO userUpdateDTO){

        try {
            boolean updated = userService.updatePassword(userUpdateDTO, userUpdateDTO.getNewPassword());
        
            if(!updated){
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
                
            }
        
            return new ResponseEntity<>("Password Updated", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/find")
    public ResponseEntity<?> findUserByFragment(@RequestParam(defaultValue = "") String fragment,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){

        Page<User> users = userService.findByFragment(fragment, page, size);

        if(users.isEmpty() || users == null){
            return new ResponseEntity<>("No Users Found", HttpStatus.NOT_FOUND);
        }

        List<FormatedUser> formatedUsers = userMapper.map(users.getContent());
        PageDTO<FormatedUser> response = pageDTOMapper.map(formatedUsers, users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    
    }

    @GetMapping("/all/{code}")
    public ResponseEntity<?> getAllUsersByPermit(@PathVariable(name = "code") String code,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){

        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        PageDTO<FormatedUser> result = userXPermitService.findUsersByPermitCode(uuid,page, size);

        if( result == null){
            return new ResponseEntity<>("No Users Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
