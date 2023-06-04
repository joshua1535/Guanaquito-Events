package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTierDTO;
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



    @Override
    public List<Tier> findAllTiers() {
        return tierRepository.findAll();
    }

    @Override
    public List<Tier> findAllTiersByEventCode(UUID eventCode) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllTiersByEventCode'");
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
    public boolean delete(UUID code) throws Exception {
        Tier tierFound = tierRepository.findById(code).orElse(null);

        if(tierFound == null) return false;

        tierRepository.deleteById(code);
        return true;
    }
}
