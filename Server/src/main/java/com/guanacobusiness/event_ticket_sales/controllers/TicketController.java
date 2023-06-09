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
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.services.TicketMapper;
import com.guanacobusiness.event_ticket_sales.services.TicketService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "*")
public class TicketController {
    
    @Autowired
    TicketService ticketService;

    @Autowired
    TicketMapper ticketMapper;

    @PostMapping("/")
    public ResponseEntity<?> postTicket(@Valid @RequestBody SaveTicketDTO info) throws Exception {
    
        try {
            Boolean response = ticketService.save(info);

            if(!response) {
                return new ResponseEntity<>("Ticket buy failed!", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>("Ticket buyed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Ticket buy failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    
    }

    @PatchMapping("/transfer")
    public ResponseEntity<?> patchChangeOwnership(@Valid @RequestBody ChangeOwnershipDTO info) throws Exception {

        try {
            Boolean ticketTransfered = ticketService.changeOwnership(info);

            if(!ticketTransfered) {
                return new ResponseEntity<>("Ticket transfer failed!", HttpStatus.BAD_REQUEST);
                
            }

            return new ResponseEntity<>("Ticket transfered successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Ticket buy failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/user/{code}")
    public ResponseEntity<?> getAllTicketsByUser(@PathVariable(name = "code") String code) {
    
        UUID uuid = UUID.fromString(code);

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        List<Ticket> tickets = ticketService.findAllUserTickets(uuid);
        
        if(tickets.isEmpty()) {
            return new ResponseEntity<>("No tickets found!", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(ticketMapper.listToCustomTicketDTO(tickets), HttpStatus.OK);
    
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
