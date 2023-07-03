package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.AmountOfTicketsSoldDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.EventAndTiersInfoDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTierDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.TierInfoDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.TierMoneyCollectedDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateTierDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.Tier;
import com.guanacobusiness.event_ticket_sales.repositories.TierRepository;
import com.guanacobusiness.event_ticket_sales.services.TierService;

import jakarta.transaction.Transactional;

@Service
public class TierServiceImpl implements TierService{
    
    @Autowired
    private TierRepository tierRepository;

    @Autowired 
    private EventServiceImpl eventService;

    @Override
    public List<Tier> findAllTiers() {
        return tierRepository.findAll();
    }

    @Override
    public Page<Tier> findAllTiers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); 
        return tierRepository.findAll(pageable);
    }

    @Override
    public EventAndTiersInfoDTO findAllTiersByEvent(Event eventFound) {
        List<Tier> tiers = eventFound.getTiers();

        if(tiers.isEmpty()) return null;

        Integer eventCapacity = 0;
        Integer remainingEventCapacity = 0;

        for(Tier tier : tiers){
            eventCapacity += tier.getCapacity();
            remainingEventCapacity += (tier.getCapacity() - tier.getTickets().size());
        }

        List<TierInfoDTO> tierInfoList = tiers.stream()
        .map(tier -> new TierInfoDTO(
            tier.getCode(),
            tier.getName(),
            tier.getPrice(),
            tier.getCapacity(),
            tier.getCapacity() - tier.getTickets().size()))
            .collect(Collectors.toList());

        EventAndTiersInfoDTO eventAndTiersInfo = new EventAndTiersInfoDTO(
            eventCapacity,
            remainingEventCapacity,
            tierInfoList
        );

        return eventAndTiersInfo;
    }

    @Override
    public Tier findTierByCode(UUID code) {
        return tierRepository.findById(code).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void save(SaveTierDTO info, Event event) throws Exception {
        Tier newTier = new Tier(
            info.getName(),
            info.getPrice(),
            info.getCapacity(),
            event
        );

        tierRepository.save(newTier);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean update(UpdateTierDTO info) throws Exception {
        Tier tierFound = tierRepository.findById(UUID.fromString(info.getCode())).orElse(null);

        if(tierFound == null) return false;

        Tier updatedTier = new Tier();

        updatedTier.setCode(tierFound.getCode());

        updatedTier.setName(info.getName() != null ? info.getName() : tierFound.getName());
        updatedTier.setPrice(info.getPrice() != null ? info.getPrice() : tierFound.getPrice());
        updatedTier.setCapacity(info.getCapacity() != null ? info.getCapacity() : tierFound.getCapacity());
        updatedTier.setEvent(tierFound.getEvent());

        tierRepository.save(updatedTier);
        return true;
    }

    @Override
    public boolean delete(UUID tierCode) throws Exception {
        Tier tierFound = tierRepository.findById(tierCode).orElse(null);

        if(tierFound == null) return false;

        tierRepository.deleteById(tierCode);
        return true;
    }

    @Override
    public AmountOfTicketsSoldDTO getAmountOfTicketSold(UUID eventCode){

        Event eventFound = eventService.findEventByCode(eventCode);

        if(eventFound == null) return null;

        List<Tier> tiers = eventFound.getTiers();

        int totalTicketsSold = 0;

        for(Tier tier : tiers){
            totalTicketsSold += tier.getTickets().size();
        }

        int totalTickets = 0;

        for(Tier tier : tiers){
            totalTickets += tier.getCapacity();
        }

        AmountOfTicketsSoldDTO amountOfTicketsSoldDTO = new AmountOfTicketsSoldDTO(
            totalTicketsSold,
            totalTickets
        );

        return amountOfTicketsSoldDTO;
    }

    @Override
    public BigDecimal getAmountOfMoneyCollected(UUID eventCode){
        Event eventFound = eventService.findEventByCode(eventCode);

        if(eventFound == null) return null;

        List<Tier> tiers = eventFound.getTiers();

        BigDecimal totalMoneyCollected = new BigDecimal(0);

        for(Tier tier : tiers){
            totalMoneyCollected = totalMoneyCollected.add(tier.getPrice().multiply(new BigDecimal(tier.getTickets().size())));
        }

        return totalMoneyCollected;
    }

    @Override
    public List<TierMoneyCollectedDTO> getAmountOfMoneyCollectedPerTier(UUID eventCode){
        Event eventFound = eventService.findEventByCode(eventCode);

        if(eventFound == null) return null;

        List<Tier> tiers = eventFound.getTiers();

        List<TierMoneyCollectedDTO> moneyCollectedByTier = tiers.stream()
        .map(tier -> new TierMoneyCollectedDTO(
            tier.getCode(),
            tier.getName(),
            tier.getPrice().multiply(new BigDecimal(tier.getTickets().size()))))
            .collect(Collectors.toList());

        return moneyCollectedByTier;
    }
}
