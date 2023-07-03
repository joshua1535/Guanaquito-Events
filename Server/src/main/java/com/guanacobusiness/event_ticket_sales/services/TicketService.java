package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface TicketService {

    Boolean save(List<SaveTicketDTO> saveTicketDTO) throws Exception;
    Boolean changeOwnership(ChangeOwnershipDTO changeOwnershipDTO) throws Exception;
    PageDTO<FormatedTicketDTO> findAllUserTickets(User user, int page, int size);
    Ticket findTicketByCode(UUID code);

}
