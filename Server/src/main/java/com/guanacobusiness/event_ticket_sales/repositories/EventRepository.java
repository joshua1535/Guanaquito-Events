package com.guanacobusiness.event_ticket_sales.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Event;

public interface EventRepository extends JpaRepository<Event, UUID>{

    List<Event> findEventsByDateBefore(LocalDate date);
    Page<Event> findAll(Pageable pageable);
    Page<Event> findByActiveTrue(Pageable pageable);
    Page<Event> findByActiveFalse(Pageable pageable);
    Page<Event> findByDateEqualsOrDateAfterAndActiveTrue(LocalDate date, LocalDate date2, Pageable pageable);
    Page<Event> findByDateEqualsOrDateBefore(LocalDate date,LocalDate date2, Pageable pageable);
    Page<Event> findByDateEqualsOrDateAfterAndCategoryCodeAndActiveTrue(LocalDate date, LocalDate date2,String code, Pageable pageable);
}
