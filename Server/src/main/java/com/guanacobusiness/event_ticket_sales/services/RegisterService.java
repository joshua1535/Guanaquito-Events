package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeTransactionCodeDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface RegisterService {
    
    List<Register> findAll();
    List<Register> findAllByTicketCode(Ticket ticket);
    Boolean save(SaveRegisterDTO info, Ticket ticket) throws Exception;
    Boolean updateTransactionCode(ChangeTransactionCodeDTO info) throws Exception;
    Boolean updateValidationTime(String transacCode) throws Exception;
    Boolean updateTransferenceTime(UUID ticketCode) throws Exception;
    boolean delete(UUID ticketCode, String transacCode) throws Exception;
    Boolean isEnabled(UUID ticketCode);
    Register findByTransferenceCode(String transacCode);
    Boolean isAvailable(Ticket ticket, User user);
    FormatedRegisterDTO status(Register register);
    Register findByTicketCodeAndTransacCode(UUID ticketCode, String transacCode);

}
