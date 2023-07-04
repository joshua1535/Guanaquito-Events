package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.ModifyPermitDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.PermitService;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.services.UserXPermitService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/permit")
@CrossOrigin(origins = "*")
public class PermitController {

    @Autowired
    UserXPermitService userXPermitService;

    @Autowired
    UserService userService;

    @Autowired
    PermitService permitService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllPermits(HttpServletRequest request){

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<Permit> permits = permitService.findAllPermits();

        if(permits.isEmpty()) {
            return new ResponseEntity<>("No permits found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(permits, HttpStatus.OK);

    }

    @GetMapping("/all/user/{code}")
    public ResponseEntity<?> getAllPermitsByUser(@PathVariable(name = "code") String code, HttpServletRequest request ){

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = UUID.fromString(code);

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        List<Permit> permits = userXPermitService.findPermitsByUserCode(uuid);

        if(permits.isEmpty()) {
            return new ResponseEntity<>("No permits found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(permits, HttpStatus.OK);

    }

    @PostMapping("/")
    public ResponseEntity<?> grantPermitToUser(@Valid @RequestBody ModifyPermitDTO info, HttpServletRequest request) throws Exception{

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }
        System.out.println("Token"+request.getHeader("Authorization").substring(7));

        UUID uuid = UUID.fromString(info.getUserCode());

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByCode(uuid);

        if(user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        UUID permitCode = UUID.fromString(info.getPermitCode());

        if(permitCode == null) {
            return new ResponseEntity<>("Invalid Permit code", HttpStatus.BAD_REQUEST);
        }

        Permit permit = permitService.findPermitByCode(permitCode);

        if(permit == null) {
            return new ResponseEntity<>("Permit not found", HttpStatus.NOT_FOUND);
        }

        Boolean granted = userXPermitService.save(user, permit);

        if(!granted) {
            return new ResponseEntity<>("Permit already granted to the user",HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>("Permit granted successfully",HttpStatus.OK);
    }
    
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> revokePermitToUser( @Valid @RequestBody ModifyPermitDTO info, HttpServletRequest request) throws Exception{

        try{
            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = UUID.fromString(info.getUserCode());
        System.out.println("Token"+request.getHeader("Authorization").substring(7));

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByCode(uuid);

        if(user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        UUID permitCode = UUID.fromString(info.getPermitCode());

        if(permitCode == null) {
            return new ResponseEntity<>("Invalid Permit code", HttpStatus.BAD_REQUEST);
        }

        Permit permit = permitService.findPermitByCode(permitCode);

        if(permit == null) {
            return new ResponseEntity<>("Permit not found", HttpStatus.NOT_FOUND);
        }

        Boolean revoked = userXPermitService.deleteByUserCodeAndPermitCode(user.getCode(), permit.getCode());

        if(!revoked) {
            return new ResponseEntity<>("Permit already revoked to the user",HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>("Permit revoked successfully",HttpStatus.OK);
        }
        catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
    MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

}
