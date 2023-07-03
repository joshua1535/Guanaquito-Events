package com.guanacobusiness.event_ticket_sales.utils;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedOrderDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.EventAndTicketInfoDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;

@Component
public class OrderMapper {

    public FormatedOrderDTO map(Order order){
        BigDecimal orderTotal = order.getTickets().stream().map(ticket -> ticket.getTier().getPrice()).reduce(BigDecimal.ZERO, BigDecimal::add);

        List<EventAndTicketInfoDTO> ticketsInfo = order.getTickets().stream().map(ticket -> new EventAndTicketInfoDTO(
            ticket.getTier().getEvent().getImage(),    
            ticket.getTier().getEvent().getTitle(),
            ticket.getTier().getEvent().getDate(),
            ticket.getTier().getEvent().getTime(),
            ticket.getTier().getName(),
            ticket.getTier().getPrice()
        )).toList();
        
        FormatedOrderDTO formatedOrder = new FormatedOrderDTO(
            order.getCode(),
            order.getPurchaseDate(),
            ticketsInfo,
            orderTotal
        );

        return formatedOrder;
    }

    public List<FormatedOrderDTO> map(List<Order> orders){ 
        return orders.stream().map(order -> map(order)).toList();
    }
    
}
