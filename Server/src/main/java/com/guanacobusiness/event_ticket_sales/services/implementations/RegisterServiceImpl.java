package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.repositories.RegisterRepository;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketService;

import jakarta.transaction.Transactional;

public class RegisterServiceImpl implements RegisterService {

    @Autowired
    RegisterRepository registerRepository;

    @Autowired
    TicketService ticketService;

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
            return false;
        }

        Register registerToUpdate = registers.stream().filter(register -> (register.getTransferenceTime().equals(null) && register.getValidationTime().equals(null))).findFirst().orElse(null);
        
        //Si se encuentra un registro vacio no se puede crear uno nuevo
        if(registerToUpdate != null) {
            return false;
        }

        Register newRegister = new Register(info.getTransactionCode(),null,null, ticket);
        registerRepository.save(newRegister);
        return true;

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean updateTransactionCode(String transacCode, UUID ticketCode) throws Exception {
        Ticket foundTicket = ticketService.findTicketByCode(ticketCode);

        if(foundTicket == null) {
            return false;
        }

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

        Register registerToUpdate = registers.stream().filter(register -> (register.getTransferenceTime().equals(null) && register.getValidationTime().equals(null))).findFirst().orElse(null);
        
        //Si no encuentra un registro vacio no se puede actualizar el codigo de transaccion
        if(registerToUpdate == null) {
            return false;
        }

        registerToUpdate.setTransactionCode(transacCode);
        registerRepository.save(registerToUpdate);

        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean updateValidationTime(Date validationTime, String transactionCode) throws Exception {
        Register foundRegister = registerRepository.FindRegisterByTransactionCode(transactionCode);

        if(foundRegister == null) {
            return false;
        }

        foundRegister.setValidationTime(validationTime);
        registerRepository.save(foundRegister);

        return true;
    }

    @Override
    public Boolean updateTransferenceTime(Date transferenceTime, UUID ticketCode) throws Exception {
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

        Register registerToUpdate = registers.stream().filter(register -> (register.getTransferenceTime().equals(null) && register.getValidationTime().equals(null))).findFirst().orElse(null);
        
        //Si no encuentra un registro vacio no se puede actualizar la hora de transferencia
        if(registerToUpdate == null) {
            return false;
        }

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
    
}
