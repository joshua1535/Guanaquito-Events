package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Order;

public interface OrderRepository extends ListCrudRepository<Order, UUID>{

    Order findOneByOrderCode(UUID orderCode);
    List<Order> findOrdersByDateAddedBetween(Date date1, Date date2);

}
