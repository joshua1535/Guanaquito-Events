package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Register;

public interface RegisterRepository extends ListCrudRepository<Register, UUID> {
    List<Register> findRegistersByTransferenceTimeIsNull();
    List<Register> findRegistersByValidationTimeIsNull();
    Register findRegisterByTicketCodeAndValidationTimeIsNotNull(UUID ticketCode);
    Register findRegisterByTicketCodeAndTransferenceTimeIsNotNull(UUID ticketCode);
    Register findRegisterByTicketCodeAndTransferenceTimeIsNullAndValidationTimeIsNull(UUID ticketCode);
    Register FindRegisterByTransactionCode(String transactionCode);
    void deleteByTicketCodeAndTransactionCode(UUID ticketCode, String transactionCode);
}
