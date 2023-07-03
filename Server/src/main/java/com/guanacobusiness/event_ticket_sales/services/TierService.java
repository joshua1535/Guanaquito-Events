package com.guanacobusiness.event_ticket_sales.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.guanacobusiness.event_ticket_sales.models.dtos.AmountOfTicketsSoldDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.EventAndTiersInfoDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTierDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.TierMoneyCollectedDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateTierDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.Tier;

public interface TierService {
    List<Tier> findAllTiers();
    Page<Tier> findAllTiers(int page, int size);
    EventAndTiersInfoDTO findAllTiersByEvent(Event eventFound);
    Tier findTierByCode(UUID code);
    void save(SaveTierDTO info, Event event) throws Exception;
    boolean update(UpdateTierDTO info) throws Exception;
    boolean delete(UUID tierCode) throws Exception;
    AmountOfTicketsSoldDTO getAmountOfTicketSold(UUID eventCode);
    BigDecimal getAmountOfMoneyCollected(UUID eventCode);
    List<TierMoneyCollectedDTO> getAmountOfMoneyCollectedPerTier(UUID eventCode);

}
