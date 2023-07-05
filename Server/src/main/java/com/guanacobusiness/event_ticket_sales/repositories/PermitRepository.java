package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;

public interface PermitRepository extends JpaRepository<Permit, UUID>{

    public List<Permit> findAll();
    public Permit findByCode(UUID code);
    public Permit findByName(String name);

}
