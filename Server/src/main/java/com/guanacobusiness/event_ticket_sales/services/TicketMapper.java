package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface TicketMapper {
    
    FormatedTicketDTO toCustomTicketDTO(Ticket ticket, User user);
    List<FormatedTicketDTO> listToCustomTicketDTO(List<Ticket> tickets, User user);

}
