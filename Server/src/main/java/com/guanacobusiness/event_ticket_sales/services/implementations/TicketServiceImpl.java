package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.Tier;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.TicketRepository;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.OrderService;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketMapper;
import com.guanacobusiness.event_ticket_sales.services.TicketService;
import com.guanacobusiness.event_ticket_sales.services.TierService;
import com.guanacobusiness.event_ticket_sales.utils.PageDTOMapper;

import jakarta.transaction.Transactional;

@Service
public class TicketServiceImpl implements TicketService{
    
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderService orderService;

    @Autowired
    RegisterService registerService;

    @Autowired
    TierService tierService;

    @Autowired
    PageDTOMapper pageDTOMapper;

    @Autowired
    TicketMapper ticketMapper;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean save(List<SaveTicketDTO> saveTicketDTO) throws Exception {
        
        User userBuyer = userRepository.findByCode(UUID.fromString(saveTicketDTO.get(0).getUserOwner()));

        if(userBuyer == null) {
            System.out.println("User not found");
            return false;
        }

        UUID uuid = UUID.fromString(saveTicketDTO.get(0).getOrder());

        Order currentOrder = orderService.findOrderByCode(uuid);

        if(currentOrder == null) {
            System.out.println("Order not found");
            return false;
        }

        try {
        
            for (SaveTicketDTO ticketDTO : saveTicketDTO) {

                Tier tier = tierService.findTierByCode(UUID.fromString(ticketDTO.getTier()));

                if(tier == null) {
                    return false;
                }

                Ticket ticket = new Ticket(currentOrder, tier, userBuyer);

                ticketRepository.save(ticket);

                System.out.println("Ticket saved");

            }

            return true;

        } catch (Exception e) {
        
            System.out.println(e.getMessage());
            return false;
        
        }
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
    public PageDTO<FormatedTicketDTO> findAllUserTickets(User userOwner, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Ticket> ticketsPage = ticketRepository.findAllByUserOwnerCode(userOwner.getCode(), pageable);

        if(ticketsPage.isEmpty() || ticketsPage == null) {
            return null;
        }

        List<FormatedTicketDTO> tickets = ticketMapper.listToCustomTicketDTO(ticketsPage.getContent(), userOwner);

        PageDTO<FormatedTicketDTO> result = pageDTOMapper.map(tickets, page, size, ticketsPage.getTotalElements(), ticketsPage.getTotalPages());

        return result;
    
    }

    @Override
    public Ticket findTicketByCode(UUID code) {
        return ticketRepository.findById(code).orElse(null);
    }

}
