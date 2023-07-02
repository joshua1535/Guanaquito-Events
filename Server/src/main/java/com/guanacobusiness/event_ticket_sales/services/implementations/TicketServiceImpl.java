package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.Tier;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.TicketRepository;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketService;
import com.guanacobusiness.event_ticket_sales.services.TierService;

import jakarta.transaction.Transactional;

@Service
public class TicketServiceImpl implements TicketService{
    
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RegisterService registerService;

    @Autowired
    TierService tierService;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean save(SaveTicketDTO saveTicketDTO) throws Exception {
        
        User foundUser = userRepository.findByCode(UUID.fromString(saveTicketDTO.getUserOwner()));

        if(foundUser == null) {
            return false;
        }

        Order foundOrder = foundUser.getOrders().stream()
            .filter(order -> order.getCode().equals(UUID.fromString(saveTicketDTO.getOrder())))
            .findFirst()
            .orElse(null);

        if(foundOrder == null) {
            return false;
        }

        Tier foundTier = tierService.findTierByCode(UUID.fromString(saveTicketDTO.getTier()));

        if(foundTier == null) {
            return false;
        }

        Ticket ticket = new Ticket(foundOrder, foundTier, foundUser);

        ticketRepository.save(ticket);
    
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean changeOwnership(ChangeOwnershipDTO changeOwnershipDTO) throws Exception {
    
        UUID uuid = UUID.fromString(changeOwnershipDTO.getNewUserOwnerCode());

        if(uuid == null) {
            return false;
        }

        Register register = registerService.findByTransferenceCode(changeOwnershipDTO.getTransferCode());

        if(register == null) {
            return false;
        }

        Ticket ticket = register.getTicket();

        if(ticket == null) {
            return false;
        }

        User newOwner = userRepository.findByCode(uuid);

        if(newOwner == null) {
            return false;
        }

        Ticket transferedTicket = new Ticket(ticket.getCode(), ticket.getOrder(), ticket.getTier(), newOwner);

        Boolean ticketTransferDate = registerService.updateTransferenceTime(transferedTicket.getCode());

        if(!ticketTransferDate) {
            return false;
        }

        ticketRepository.save(transferedTicket);

        return true;

    }

    @Override
    public List<Ticket> findAllUserTickets(User userOwnerCode) {

        List<Ticket> tickets = userOwnerCode.getOrders().stream()
            .flatMap(order -> order.getTickets().stream())
            .toList();

        if(tickets.isEmpty()) {
            return userOwnerCode.getTickets();
        }

        return tickets;
    
    }

    @Override
    public Ticket findTicketByCode(UUID code) {
        return ticketRepository.findById(code).orElse(null);
    }

}
