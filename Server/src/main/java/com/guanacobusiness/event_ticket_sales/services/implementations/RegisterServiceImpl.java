package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeTransactionCodeDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.RegisterRepository;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketService;
import com.guanacobusiness.event_ticket_sales.utils.CurrentDateTime;
import com.guanacobusiness.event_ticket_sales.utils.CurrentTime;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

import jakarta.transaction.Transactional;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    RegisterRepository registerRepository;

    @Autowired
    TicketService ticketService;

    @Autowired
    CurrentDateTime currentDateTime;

    @Autowired
    CurrentTime currentTime;

    @Autowired
    StringToUUID stringToUUID;

    @Override
    public List<Register> findAll() {
        return registerRepository.findAll();
    }

    @Override
    public List<Register> findAllByTicketCode(Ticket ticket) {
        List<Register> registers = ticket.getRegisters();

        if(registers == null || registers.isEmpty()) {
            return null;
        }

        return registers;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean save(SaveRegisterDTO info, Ticket ticket) throws Exception {
        List<Register> registers = ticket.getRegisters();

        Register validatedRegister = registers.stream().filter(register -> (register.getValidationTime() != null)).findFirst().orElse(null);

        //Si encuentra un registro validado no se puede crear un registro nuevo
        if(validatedRegister != null) {
            System.out.println("Registro validado" + validatedRegister);
            return false;
        }

        Register emptyRegister = registers.stream().filter(register -> (register.getTransferenceTime() == null && register.getValidationTime() == null )).findFirst().orElse(null);
        
        //Si se encuentra un registro vacio no se puede crear uno nuevo
        if(emptyRegister != null) {
            System.out.println("Registro vacio" + emptyRegister);
            return false;
        }

        LocalTime creationTime = currentTime.now();

        Register newRegister = new Register(info.getTransactionCode(),creationTime,null,null, ticket);
        registerRepository.save(newRegister);
        return true;

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean updateTransactionCode(ChangeTransactionCodeDTO info) throws Exception {
        UUID ticketCode = stringToUUID.convert(info.getTicketCode());

        Ticket foundTicket = ticketService.findTicketByCode(ticketCode);

        if(foundTicket == null) {
            return false;
        }

        //Register foundRegister = registerRepository.findByTicketCodeAndTransactionCode(ticketCode, info.getTransactionCode());

        /* if(foundRegister == null) {
            return false;
        } */

        List<Register> registers = foundTicket.getRegisters();

        //Si no hay registros no se puede actualizar el codigo de transaccion
        if(registers == null || registers.isEmpty()) {
            return false;
        }

        Register validatedRegister = registers.stream().filter(register -> (register.getValidationTime() != null)).findFirst().orElse(null);

        //Si encuentra un registro validado no se puede actualizar el codigo de transaccion
        if(validatedRegister != null) {
            return false;
        }

        Register registerToUpdate = registers.stream().filter(register -> (register.getTransferenceTime() == null && register.getValidationTime() == null)).findFirst().orElse(null);
        
        //Si no encuentra un registro vacio no se puede actualizar el codigo de transaccion
        if(registerToUpdate == null) {
            return false;
        }

        //Si registro ya fue validado no se puede actualizar la hora de validacion
        /* if(foundRegister.getValidationTime() != null) {
            return false;
        }

        //Si registro ya fue transferido no se puede actualizar la hora de validacion
        if(foundRegister.getTransferenceTime() != null) {
            return false;
        } */
        LocalTime updateTime = currentTime.now();

        registerToUpdate.setTransactionCode(info.getTransactionCode());
        registerToUpdate.setCreationTime(updateTime);
        registerRepository.save(registerToUpdate);
        System.out.println(info.getTransactionCode());

        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean updateValidationTime(String transactionCode) throws Exception {
        Register foundRegister = registerRepository.findByTransactionCode(transactionCode);

        if(foundRegister == null) {
            return false;
        }

        //Si registro ya fue validado no se puede actualizar la hora de validacion
        if(foundRegister.getValidationTime() != null) {
            return false;
        }

        //Si registro ya fue transferido no se puede actualizar la hora de validacion
        if(foundRegister.getTransferenceTime() != null) {
            return false;
        }

        //Si el registro ya exedio el tiempo valido para transferir no se puede actualizar la hora de transferencia
        LocalTime now = currentTime.now();
        LocalTime referenceTime = foundRegister.getCreationTime().plusMinutes(2);

        if(now.isAfter(referenceTime)) {
            return false;
        }

        LocalDateTime validationTime = currentDateTime.now();

        foundRegister.setValidationTime(validationTime);
        registerRepository.save(foundRegister);

        return true;
    }

    @Override
    public Boolean updateTransferenceTime(UUID ticketCode) throws Exception {
        Ticket foundTicket = ticketService.findTicketByCode(ticketCode);

        //Si no encuentra el ticket no se puede actualizar la hora de transferencia
        if(foundTicket == null) {
            return false;
        }

        List<Register> registers = foundTicket.getRegisters();

        //Si no hay registros no se puede actualizar la hora de transferencia
        if(registers == null || registers.isEmpty()) {
            return false;
        }

        Register validatedRegister = registers.stream().filter(register -> (register.getValidationTime() != null)).findFirst().orElse(null);

        //Si encuentra un registro validado no se puede actualizar la hora de transferencia
        if(validatedRegister != null) {
            return false;
        }

        Register registerToUpdate = registers.stream().filter(register -> (register.getTransferenceTime() == null && register.getValidationTime() == null)).findFirst().orElse(null);
        
        //Si no encuentra un registro vacio no se puede actualizar la hora de transferencia
        if(registerToUpdate == null) {
            return false;
        }

        //Si el registro ya exedio el tiempo valido para transferir no se puede actualizar la hora de transferencia
        LocalTime now = currentTime.now();
        LocalTime referenceTime = registerToUpdate.getCreationTime().plusMinutes(10);

        if(now.isAfter(referenceTime)) {
            return false;
        }

        LocalDateTime transferenceTime = currentDateTime.now();

        registerToUpdate.setTransferenceTime(transferenceTime);
        registerRepository.save(registerToUpdate);

        return true;
    }

    @Override
    public boolean delete(UUID ticketCode, String transacCode) throws Exception {
        Ticket foundTicket = ticketService.findTicketByCode(ticketCode);

        if(foundTicket == null) {
            return false;
        }

        registerRepository.deleteByTicketCodeAndTransactionCode(ticketCode, transacCode);
        return true;
    }

    @Override
    public Boolean isEnabled(UUID ticketCode) {
    
        Register registers = registerRepository.findAllByTransferenceTimeIsNull()
            .stream()
            .filter(register -> (register.getTicket().getCode().equals(ticketCode)))
            .findAny()
            .orElse(null);

        if(registers == null){
            return false;
        }

        return true;
    }

    @Override
    public Register findByTransferenceCode(String transacCode) {
    
        Register foundRegister = registerRepository.findByTransactionCode(transacCode);

        if(foundRegister == null) {
            return null;
        }

        return foundRegister;
    
    }

    @Override
    public Boolean isAvailable(Ticket ticket, User user) {

        List<Register> registers = ticket.getRegisters();

        if(registers == null || registers.isEmpty()) {
            return true;
        }
    
        Register validatedRegister = registers.stream().filter(register -> (register.getValidationTime() != null)).findFirst().orElse(null);

        if(validatedRegister != null) {
            System.out.println("Validation time no es null");
            return false;
        }

        System.out.println("comprador: " + ticket.getOrder().getUserBuyer().getEmail() + " usuario: " + user.getEmail());
        Register transferedRegister = registers.stream().filter(register -> (register.getTransferenceTime() != null && ticket.getOrder().getUserBuyer().getEmail() == user.getEmail())).findFirst().orElse(null);

        System.out.println("transferedRegister: " + transferedRegister);

        if(transferedRegister != null) {
            System.out.println("entro aqui?");
            return false;
        }

        return true;

    }

    @Override
    public FormatedRegisterDTO status(Register register) {
        LocalTime registerCreationTime = register.getCreationTime();
        LocalTime referenceTime = registerCreationTime.plusMinutes(10);
        LocalTime now = currentTime.now();

        Duration duration = Duration.between(now, referenceTime);
        long minutesRemaining = duration.toMinutes() % 60;
        long secondsRemaining = duration.getSeconds() % 60;

        if(minutesRemaining < 0 || secondsRemaining < 0) {
            FormatedRegisterDTO formatedRegister = new FormatedRegisterDTO(
                register.getCode(), 
                register.getTransactionCode(), 
                register.getCreationTime(), 
                null, 
                null, 
                register.getTransferenceTime(), 
                register.getValidationTime()
                );
            return formatedRegister;
        }

        FormatedRegisterDTO formatedRegister = new FormatedRegisterDTO(
            register.getCode(), 
            register.getTransactionCode(), 
            register.getCreationTime(), 
            (int) minutesRemaining, 
            (int) secondsRemaining, 
            register.getTransferenceTime(), 
            register.getValidationTime()
            );
        return formatedRegister;
    }

    @Override
    public Register findByTicketCodeAndTransacCode(UUID ticketCode, String transacCode) {
        Register foundRegister = registerRepository.findByTicketCodeAndTransactionCode(ticketCode, transacCode);

        if(foundRegister == null) {
            return null;
        }

        return foundRegister;
    }
    
}
