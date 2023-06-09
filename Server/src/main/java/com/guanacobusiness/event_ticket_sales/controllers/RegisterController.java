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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeTransactionCodeDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.ValidateTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketService;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "*")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private StringToUUID stringToUUID;

    @Autowired
    private TicketService ticketService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllRegisters(){
        List<Register> registers = registerService.findAll();

        if(registers == null || registers.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<>(registers, HttpStatus.OK);
    }

    @GetMapping("/ticket/{code}")
    public ResponseEntity<?> getAllRegistersByTicketCode(@PathVariable(name = "code") String code){
        UUID uuid = stringToUUID.convert(code);
        
        if(uuid == null){
            return new ResponseEntity<>("Invalid Code", HttpStatus.BAD_REQUEST);
        }

        Ticket foundTicket = ticketService.findTicketByCode(uuid);

        if(foundTicket == null){
            return new ResponseEntity<>("Ticket Not Found", HttpStatus.NOT_FOUND);
        }

        List<Register> registers = registerService.findAllByTicketCode(foundTicket);

        if(registers == null || registers.isEmpty()){
            return new ResponseEntity<>("Registers Not Found",HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(registers,HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> createNewRegister(@RequestBody SaveRegisterDTO info ) {
        Ticket foundTicket = ticketService.findTicketByCode(stringToUUID.convert(info.getTicketCode()));

        if (foundTicket == null) {
            return new ResponseEntity<>("Ticket Not Found",HttpStatus.NOT_FOUND);
        }

        try {
            Boolean saveStatus = registerService.save(info, foundTicket);

            if(!saveStatus){
                return new ResponseEntity<>("Register Creation Failed",HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/update/transaction-code")
    public ResponseEntity<?> updateTransactionCode(@RequestBody ChangeTransactionCodeDTO info) {
        try {
            Boolean updateStatus = registerService.updateTransactionCode(info);

            if(!updateStatus){
                return new ResponseEntity<>("Tansaction Code Update Failed",HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/validate-ticket")
    public ResponseEntity<?> validateTicket(@RequestBody ValidateTicketDTO info ){
        try {
            Boolean updateStatus = registerService.updateValidationTime(info.getTransactionCode());

            if(!updateStatus){
                return new ResponseEntity<>("Validation Time Update Failed",HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
}
