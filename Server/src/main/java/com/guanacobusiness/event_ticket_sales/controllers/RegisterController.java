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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeTransactionCodeDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.ValidateTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketService;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

import jakarta.servlet.http.HttpServletRequest;

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
    public ResponseEntity<?> getAllRegisters(HttpServletRequest request){

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<Register> registers = registerService.findAll();

        if(registers == null || registers.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<>(registers, HttpStatus.OK);
    }

    @GetMapping("/one")
    public ResponseEntity<?> getOneRegister(@RequestBody SaveRegisterDTO info,HttpServletRequest request){

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        Ticket foundTicket = ticketService.findTicketByCode(stringToUUID.convert(info.getTicketCode()));

        if (foundTicket == null) {
            return new ResponseEntity<>("Ticket Not Found",HttpStatus.NOT_FOUND);
        }

        Register register = registerService.findByTicketCodeAndTransacCode(foundTicket.getCode(), info.getTransactionCode());

        if(register == null){
            return new ResponseEntity<>("Register Not Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(register, HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<?> getRegisterStatus(HttpServletRequest request, @RequestParam(defaultValue = "") String transactionCode, @RequestParam(defaultValue = "") String ticketCode){

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        if(transactionCode.isEmpty() || ticketCode.isEmpty()){
            return new ResponseEntity<>("Invalid Parameters",HttpStatus.BAD_REQUEST);
        }

        Ticket foundTicket = ticketService.findTicketByCode(stringToUUID.convert(ticketCode));

        if (foundTicket == null) {
            return new ResponseEntity<>("Ticket Not Found",HttpStatus.NOT_FOUND);
        }

        Register register = registerService.findByTicketCodeAndTransacCode(foundTicket.getCode(), transactionCode);

        if(register == null){
            return new ResponseEntity<>("Register Not Found",HttpStatus.NOT_FOUND);
        }

        FormatedRegisterDTO response = registerService.status(register);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/ticket/{code}")
    public ResponseEntity<?> getAllRegistersByTicketCode(@PathVariable(name = "code") String code, HttpServletRequest request){

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

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
    public ResponseEntity<?> createNewRegister(@RequestBody SaveRegisterDTO info, HttpServletRequest request ) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

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
    public ResponseEntity<?> updateTransactionCode(@RequestBody ChangeTransactionCodeDTO info, HttpServletRequest request) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

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
    public ResponseEntity<?> validateTicket(@RequestBody ValidateTicketDTO info, HttpServletRequest request) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            Boolean updateStatus = registerService.updateValidationTime(info.getTransactionCode());

            if(!updateStatus){
                return new ResponseEntity<>("Validation Time Update Failed",HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
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
