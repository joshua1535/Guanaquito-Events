package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;

public interface TicketService {

    Boolean save(SaveTicketDTO saveTicketDTO) throws Exception;
    Boolean changeOwnership(ChangeOwnershipDTO changeOwnershipDTO) throws Exception;
    List<Ticket> findAllUserTickets(UUID userOwnerCode);
    Ticket findTicketByCode(UUID code);

}
