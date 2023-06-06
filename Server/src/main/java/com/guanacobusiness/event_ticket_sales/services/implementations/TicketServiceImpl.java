package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.ChangeOwnershipDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.ValidateTicketDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Ticket;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.TicketRepository;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.RegisterService;
import com.guanacobusiness.event_ticket_sales.services.TicketService;

@Service
public class TicketServiceImpl implements TicketService{
    
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RegisterService registerService;

    @Override
    public void save(SaveTicketDTO saveTicketDTO) throws Exception {
        Ticket ticket = new Ticket(saveTicketDTO.getOrder(), saveTicketDTO.getTier(), saveTicketDTO.getUserOwner());

        ticketRepository.save(ticket);

    }

    @Override
    public Boolean changeOwnership(ChangeOwnershipDTO changeOwnershipDTO) throws Exception {
    
        Ticket ticket = ticketRepository.findByTransferenceCode(changeOwnershipDTO.getTransferCode());

        if(ticket == null) {
            return false;
        }

        User newOwner = userRepository.findByCode(changeOwnershipDTO.getNewUserOwnerCode());

        if(newOwner == null) {
            return false;
        }

        Ticket transferedTicket = new Ticket(ticket.getCode(), ticket.getOrder(), ticket.getTier(), newOwner);

        Boolean ticketTransferDate = registerService.updateTransferenceTime(new Date(), transferedTicket.getCode());

        if(!ticketTransferDate) {
            return false;
        }

        ticketRepository.save(transferedTicket);

        return true;

    }

    @Override
    public List<FormatedTicketDTO> findAllTickets(UUID userOwnerCode) {
    
        User user = userRepository.findByCode(userOwnerCode);

        if(user == null) {
            return null;
        }

        List<Ticket> tickets = user.getTickets();

        List<FormatedTicketDTO> formatedTickets =
            tickets.stream()
                .map(ticket -> new FormatedTicketDTO(
                    registerService.isEnabled(ticket.getCode()) ? true : false,
                    "Event Picture",
                    new Date(),
                    new Time(0),
                    "Title Event",
                    ticket.getTier().getName()
                ))
                .toList();

        return formatedTickets;
    
    }

    @Override
    public Boolean validateTicket(ValidateTicketDTO validateTicketDTO) throws Exception {
        
        Ticket ticket = ticketRepository.findByTransferenceCode(validateTicketDTO.getValidationCode());

        if(ticket == null) {
            return false;
        }

        User foundUser = userRepository.findByCode(validateTicketDTO.getUserOwnerCode());

        if(foundUser == null) {
            return false;
        }

        Boolean ticketValidationDate = registerService.updateValidationTime(new Date(), validateTicketDTO.getValidationCode());

        if(!ticketValidationDate) {
            return false;
        }

        return true;

    }

    @Override
    public Ticket findTicketByCode(UUID code) {
        return ticketRepository.findById(code).orElse(null);
    }

}
