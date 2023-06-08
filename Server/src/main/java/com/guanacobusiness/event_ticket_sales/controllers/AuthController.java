package com.guanacobusiness.event_ticket_sales.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SaveUserDTO info) throws Exception{
    
        try {
            boolean userFound= userService.register(info);
            if(userFound == false){
                return new ResponseEntity<>("User already exists",HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("SignUp Successfull!", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("The User cannot be created",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    
    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody AuthRequestDTO info) throws Exception{

        try {
            boolean userFound = userService.login(info);

            if(!userFound){
                return new ResponseEntity<>("Invalid email or password",HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>("Login Successfull!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
