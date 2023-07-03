package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.TicketMapper;
import com.guanacobusiness.event_ticket_sales.services.TicketService;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.utils.JWTTools;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "*")
public class TicketController {
    
    @Autowired
    TicketService ticketService;

    @Autowired
    TicketMapper ticketMapper;

    @Autowired
    UserService userService;

    @Autowired
    JWTTools jwtUtil;

    @PostMapping("/")
    public ResponseEntity<?> postTicket(@Valid @RequestBody List<SaveTicketDTO> info, HttpServletRequest request) throws Exception {
    
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            String jwt = request.getHeader("Authorization").substring(7);
            String userEmail = jwtUtil.getUsernameFrom(jwt);

            User user = userService.findByEmail(userEmail);

            if(user == null) {
                return new ResponseEntity<>("User not found!", HttpStatus.BAD_REQUEST);
            }

            info.forEach(ticket -> ticket.setUserOwner(user.getCode().toString()));

            Boolean response = ticketService.save(info);

            if(!response) {

                return new ResponseEntity<>("Ticket buy failed!", HttpStatus.BAD_REQUEST);
            
            }

            return new ResponseEntity<>("Ticket buyed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage() + " " + e.getCause());
            return new ResponseEntity<>("Ticket buy failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    
    }

    @PatchMapping("/transfer")
    public ResponseEntity<?> patchChangeOwnership(@Valid @RequestBody ChangeOwnershipDTO info, HttpServletRequest request) throws Exception {

        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            String jwt = request.getHeader("Authorization").substring(7);
            String userEmail = jwtUtil.getUsernameFrom(jwt);

            User user = userService.findByEmail(userEmail);

            if(user == null) {
                return new ResponseEntity<>("User not found!", HttpStatus.BAD_REQUEST);
            }

            info.setNewUserOwnerCode(user.getCode().toString());

            Boolean ticketTransfered = ticketService.changeOwnership(info);

            if(!ticketTransfered) {
            
                return new ResponseEntity<>("Ticket transfer failed!", HttpStatus.BAD_REQUEST);
            
            }

            return new ResponseEntity<>("Ticket transfered successfully!", HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage() + " " + e.getCause());
            return new ResponseEntity<>("Ticket transfer failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/user-tickets")
    public ResponseEntity<?> getAllTicketsByUser(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request){
    
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        String jwt = request.getHeader("Authorization").substring(7);
        String userEmail = jwtUtil.getUsernameFrom(jwt);

        User user = userService.findByEmail(userEmail);

        if(user == null) {
            return new ResponseEntity<>("User not found!", HttpStatus.BAD_REQUEST);
        }

        PageDTO<FormatedTicketDTO> response = ticketService.findAllUserTickets(user, page, size);
        
        if(response == null) {
            return new ResponseEntity<>("No tickets found!", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    
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
