package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Tier;

public interface TierRepository extends ListCrudRepository<Tier, UUID> {

    Tier findOneByNameAndEventCode(String name, UUID eventCode);
}
