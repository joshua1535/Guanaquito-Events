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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.GetTicketsDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.ValidateTicketDTO;
import com.guanacobusiness.event_ticket_sales.services.TicketService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "*")
public class TicketController {
    
    @Autowired
    TicketService ticketService;

    @PostMapping("/")
    public ResponseEntity<?> postTicket(@Valid @RequestBody SaveTicketDTO info) throws Exception {
    
        ticketService.save(info);

        return new ResponseEntity<>("Ticket buyed successfully!", HttpStatus.OK);
    
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> postChangeOwnership(@Valid @RequestBody ChangeOwnershipDTO info) throws Exception {

        Boolean ticketTransfered = ticketService.changeOwnership(info);

        if(!ticketTransfered) {
            return new ResponseEntity<>("Ticket transfer failed!", HttpStatus.BAD_REQUEST);
            
        }

        return new ResponseEntity<>("Ticket transfered successfully!", HttpStatus.OK);

    }

    @PostMapping("/validate")
    public ResponseEntity<?> postValidateTicket(@Valid @RequestBody ValidateTicketDTO info) throws Exception {

        Boolean ticketValidated = ticketService.validateTicket(info);

        if(!ticketValidated) {
            return new ResponseEntity<>("Ticket validation failed!", HttpStatus.BAD_REQUEST);
            
        }

        return new ResponseEntity<>("Ticket validated successfully!", HttpStatus.OK);

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTickets(@Valid @RequestBody GetTicketsDTO info) {
    
        List<FormatedTicketDTO> tickets = ticketService.findAllTickets(info.getUserOwnerCode());
        
        if(tickets.isEmpty()) {
            return new ResponseEntity<>("No tickets found!", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(tickets, HttpStatus.OK);
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
