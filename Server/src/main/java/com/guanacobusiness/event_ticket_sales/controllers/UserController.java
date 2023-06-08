package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    UserService userService;

    @Autowired
    private StringToUUID stringToUUID;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){

        List<User> users = userService.findAll();

        if(users.isEmpty() || users == null){
            return new ResponseEntity<>("No Users Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    
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
    public ResponseEntity<?> findUserByFragment(@RequestParam(required = false) String fragment){

        List<User> users = userService.findByFragment(fragment);

        if(users.isEmpty() || users == null){
            return new ResponseEntity<>("No Users Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    
    }

    @GetMapping("/all/{code}")
    public ResponseEntity<?> getAllUsersByPermit(@PathVariable(name = "code") String code){

        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        List<User> users = userService.findByPermit(uuid);

        if(users.isEmpty() || users == null){
            return new ResponseEntity<>("No Users Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
