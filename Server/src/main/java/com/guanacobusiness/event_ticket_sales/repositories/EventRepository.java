package com.guanacobusiness.event_ticket_sales.repositories;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.guanacobusiness.event_ticket_sales.models.entities.Event;

public interface EventRepository extends JpaRepository<Event, UUID>{

    List<Event> findEventsByDateBefore(LocalDate date);
    Page<Event> findAll(Pageable pageable);
    Page<Event> findByActiveTrue(Pageable pageable);
    Page<Event> findByActiveFalse(Pageable pageable);
    Page<Event> findByDateEqualsOrDateAfterAndActiveTrue(LocalDate date, LocalDate date2, Pageable pageable);
    Page<Event> findByDateEqualsOrDateBefore(LocalDate date,LocalDate date2, Pageable pageable);
    Page<Event> findByDateEqualsOrDateAfterAndCategoryCodeAndActiveTrue(LocalDate date, LocalDate date2,String code, Pageable pageable);
    
    @Query("SELECT e FROM Event e WHERE e.category.name = :categoryName AND e.date > CURRENT_DATE")
    List<Event> findUpcomingEventsByCategory(@Param("categoryName") String categoryName);

    @Query("SELECT e FROM Event e " +
            "WHERE e.date >= :date " +
            "AND e.active = true " +
            "AND e.category.code = :categoryCode " +
            "AND e.id NOT IN (" +
            "  SELECT eSub.id FROM Event eSub " +
            "  LEFT JOIN eSub.tiers tSub " +
            "  LEFT JOIN tSub.tickets tkSub " +
            "  WHERE tkSub.userOwner.code = :userCode" +
            ")")
    Page<Event> findByCurrentAndCategoryAndNotUser(@Param("date") LocalDate date, @Param("categoryCode") String categoryCode, @Param("userCode") UUID userCode, Pageable pageable );
    Page<Event> findByDateEqualsOrDateAfterAndActiveTrueAndCategoryCode(LocalDate date, LocalDate date2, String code, Pageable pageable);
}
