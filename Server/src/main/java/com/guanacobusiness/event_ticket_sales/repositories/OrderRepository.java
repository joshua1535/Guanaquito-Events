package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Order;

public interface OrderRepository extends JpaRepository<Order, UUID>{

    Order findOneByCode(UUID orderCode);
    List<Order> findOrdersByPurchaseDateBetween(Date date1, Date date2);
    Page<Order> findOrdersByPurchaseDateBetween(Date date1, Date date2, Pageable pageable);
    Page<Order> findByUserBuyerCode(UUID userBuyerCode, Pageable pageable);

}
