package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Register;

public interface RegisterRepository extends ListCrudRepository<Register, UUID> {
    List<Register> findAllByTransferenceTimeIsNull();
    List<Register> findAllByValidationTimeIsNull();
    Register findByTicketCodeAndValidationTimeIsNotNull(UUID ticketCode);
    Register findByTicketCodeAndTransferenceTimeIsNotNull(UUID ticketCode);
    Register findByTicketCodeAndTransferenceTimeIsNullAndValidationTimeIsNull(UUID ticketCode);
    Register findByTransactionCode(String transactionCode);
    void deleteByTicketCodeAndTransactionCode(UUID ticketCode, String transactionCode);
}
