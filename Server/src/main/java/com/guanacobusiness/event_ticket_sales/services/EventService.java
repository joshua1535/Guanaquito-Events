package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;

public interface EventService {
    List<Event>findAllEvents();
    Page<Event>findAllEvents(int page, int size);
    List<Event> findAllActiveEvents();
    Page<Event> findAllActiveEvents(int page, int size);
    List<Event>findAllInactiveEvents();
    Page<Event> findAllInactiveEvents(int page, int size);
    List<Event>findAllCurrentEvents();
    PageDTO<Event>findAllCurrentEvents(int page, int size);
    List<Event>findAllArchivedEvents();
    PageDTO<Event>findAllArchivedEvents(int page, int size);
    PageDTO<Event> findAllByCategory(String code, int page, int size);
    Event findEventByCode(UUID code);
    Event save(SaveEventDTO info, Category category) throws Exception;
    boolean update(UpdateEventDTO info) throws Exception;
    boolean changeEventStatus(UUID code) throws Exception;
}
