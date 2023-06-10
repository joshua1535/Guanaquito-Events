package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.CreateOrderDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.DateRangeDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.OrderRepository;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.OrderService;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createOrder(CreateOrderDTO info, User user) throws Exception {
    
        orderRepository.save(new Order(user, info.getPurchaseDate()));
    
    }

    @Override
    public List<Ticket> findTicketsByOrderCode(UUID orderCode) {
        Order order = orderRepository.findOneByCode(orderCode);

        if(order == null) {
            return null;
        }

        List<Ticket> tickets = order.getTickets();

        return tickets;

    }

    @Override
    public List<Order> findOrdersBetweenDates(DateRangeDTO info) {
        
        List<Order> orders = orderRepository.findOrdersByPurchaseDateBetween(info.getStartDate(), info.getEndDate());

        if(orders == null) {
            return null;
        }

        return orders;

    }

    @Override
    public List<Order> findAllOrdersByUserBuyerCode(UUID userBuyerCode) {
        User user = userRepository.findByCode(userBuyerCode);

        if(user == null) {
            return null;
        }

        return user.getOrders();
    }

}
