package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Tier;

public interface TierRepository extends JpaRepository<Tier, UUID> {

    Tier findOneByNameAndEventCode(String name, UUID eventCode);
    Page<Tier>findAll(Pageable pageable);
}
