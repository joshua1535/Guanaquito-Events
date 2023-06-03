package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;

public interface PermitRepository extends ListCrudRepository<Permit, UUID>{

    public List<Permit> findAll();

}
