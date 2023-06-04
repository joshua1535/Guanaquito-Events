package com.guanacobusiness.event_ticket_sales.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.DateRangeDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface OrderService {

    void createOrder(User userBuyer, Date purchaseDate) throws Exception;
    List<Ticket> findTicketsByOrderCode(UUID orderCode);
    List<Order> findOrdersBetweenDates(DateRangeDTO dateRangeDTO);

}
