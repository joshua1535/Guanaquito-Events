package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.ValidateTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;

public interface TicketService {

    Boolean save(SaveTicketDTO saveTicketDTO) throws Exception;
    Boolean changeOwnership(ChangeOwnershipDTO changeOwnershipDTO) throws Exception;
    List<FormatedTicketDTO> findAllTickets(UUID userOwnerCode);
    Ticket findTicketByCode(UUID code);
    Boolean validateTicket(ValidateTicketDTO validateTicketDTO) throws Exception;

}
