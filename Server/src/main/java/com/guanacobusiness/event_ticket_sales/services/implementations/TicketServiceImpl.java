package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.ValidateTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.TicketRepository;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.TicketService;

@Service
public class TicketServiceImpl implements TicketService{
    
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public void save(SaveTicketDTO saveTicketDTO) throws Exception {
        Ticket ticket = new Ticket(saveTicketDTO.getOrder(), saveTicketDTO.getTier(), saveTicketDTO.getUserOwner());

        ticketRepository.save(ticket);

    }

    @Override
    public Boolean changeOwnership(ChangeOwnershipDTO changeOwnershipDTO) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'changeOwnership'");
    }

    @Override
    public List<Ticket> findAllTickets(UUID userOwnerCode) {
    
        User user = userRepository.findByCode(userOwnerCode);

        if(user == null) {
            return null;
        }

        List<Ticket> tickets = user.getTickets();

        return tickets;
    
    }

    @Override
    public Boolean validateTicket(ValidateTicketDTO validateTicketDTO) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'validateTicket'");
    }

    @Override
    public Ticket findTicketByCode(UUID code) {
        return ticketRepository.findById(code).orElse(null);
    }

}
