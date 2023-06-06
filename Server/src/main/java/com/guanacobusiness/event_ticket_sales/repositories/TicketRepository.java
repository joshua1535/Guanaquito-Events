package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;

public interface TicketRepository extends ListCrudRepository<Ticket, UUID>{
    
    Ticket findByTransferenceCode(String transferenceCode);

}
