package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;

public interface TicketMapper {
    
    FormatedTicketDTO toCustomTicketDTO(Ticket ticket);
    List<FormatedTicketDTO> listToCustomTicketDTO(List<Ticket> tickets);

}
