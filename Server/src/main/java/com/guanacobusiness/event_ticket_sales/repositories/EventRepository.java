package com.guanacobusiness.event_ticket_sales.repositories;

import java.time.LocalDate;
//import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Event;

public interface EventRepository extends ListCrudRepository<Event, UUID>{

    List<Event> findEventsByDateBefore(LocalDate date);
}
