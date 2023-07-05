package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
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
    public FormatedTicketDTO toCustomTicketDTO(Ticket ticket, User user) {
        
        Event event = eventService.findEventByCode(ticket.getTier().getEvent().getCode());

        FormatedTicketDTO formatedTicketDTO = new FormatedTicketDTO(
                ticket.getCode().toString(),
                registerService.isAvailable(ticket, user),
                event.getImage(),
                event.getDate(),
                event.getTime(),
                event.getTitle(),
                ticket.getTier().getName(),
                event.getCode().toString()
        );

        return formatedTicketDTO;

    }

    @Override
    public List<FormatedTicketDTO> listToCustomTicketDTO(List<Ticket> tickets, User user) {
        return tickets.stream().map(ticket -> toCustomTicketDTO(ticket, user)).collect(Collectors.toList());
    }

}
