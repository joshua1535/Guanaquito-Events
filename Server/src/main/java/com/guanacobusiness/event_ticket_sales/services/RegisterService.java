package com.guanacobusiness.event_ticket_sales.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveRegisterDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;

public interface RegisterService {
    
    List<Register> findAll();
    List<Register> findAllByTicketCode(Ticket ticket);
    Boolean save(SaveRegisterDTO info, Ticket ticket) throws Exception;
    Boolean updateTransactionCode(String transacCode, UUID ticketCode) throws Exception;
    Boolean updateValidationTime(Date validationTime, String transacCode) throws Exception;
    Boolean updateTransferenceTime(Date transferenceTime, UUID ticketCode) throws Exception;
    boolean delete(UUID ticketCode, String transacCode) throws Exception;
    Boolean isEnabled(UUID ticketCode);
    Register findByTransferenceCode(String transacCode);

}
