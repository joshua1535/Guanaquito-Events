package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.TokenDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UserFoundDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Token;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.utils.JWTTools;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    UserService userService;

    @Autowired
    JWTTools jwtUtil;

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
            User userFound = userService.login(info);

            if(userFound == null){
                return new ResponseEntity<>("Invalid email or password",HttpStatus.BAD_REQUEST);
            }

            if(!userService.comparePassword(info.getPassword(), userFound.getPassword())){
            return new ResponseEntity<>(
                "Invalid username or password",
                HttpStatus.UNAUTHORIZED
            );
        }

            try {
                Token token = userService.registerToken(userFound);
                return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/whoami")
    public ResponseEntity<?> whoami(HttpServletRequest request){
        
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            String jwt = request.getHeader("Authorization").substring(7);
            String userEmail = jwtUtil.getUsernameFrom(jwt);

            UserFoundDTO foundUser = userService.whoami(userEmail);
            
            if(foundUser == null){
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(foundUser, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
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