package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.services.EventService;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketMapper;
import com.guanacobusiness.event_ticket_sales.services.TierService;

@Component
public class TicketMapperImpl implements TicketMapper{

    @Autowired
    RegisterService registerService;

    @Autowired
    TierService tierService;

    @Autowired
    EventService eventService;

    @Override
    public FormatedTicketDTO toCustomTicketDTO(Ticket ticket) {
        
        Event event = eventService.findEventByCode(ticket.getTier().getEvent().getCode());

        FormatedTicketDTO formatedTicketDTO = new FormatedTicketDTO(
                registerService.isEnabled(ticket.getCode()) ? true : false,
                event.getImage(),
                event.getDate(),
                event.getTime(),
                event.getTitle(),
                ticket.getTier().getName()
        );

        return formatedTicketDTO;

    }

    @Override
    public List<FormatedTicketDTO> toCustomTicketDTO(List<Ticket> tickets) {
        return tickets.stream().map(ticket -> toCustomTicketDTO(ticket)).collect(Collectors.toList());
    }
    
}
