package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.UUID;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.EventLocation;

public interface EventLocationRepository extends JpaRepository<EventLocation, UUID>{
    List<EventLocation> findByDepartmentCode(String code);
}
