package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;

public interface EventService {
    List<Event>findAllEvents();
    List<Event> findAllActiveEvents();
    List<Event>findAllInactiveEvents();
    List<Event>findAllCurrentEvents();
    List<Event>findAllArchivedEvents();
    Event findEventByCode(UUID code);
    void save(SaveEventDTO info, Category category) throws Exception;
    boolean update(UpdateEventDTO info) throws Exception;
    boolean changeEventStatus(UUID code) throws Exception;
}
