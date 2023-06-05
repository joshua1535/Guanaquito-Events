package com.guanacobusiness.event_ticket_sales.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;

public interface EventService {
    List<Event>findAllEvents();
    List<Event>findAllInactiveEvents();
    List<Event>findAllArchivedEvents(Date date);
    Event findEventByCode(UUID code);
    void save(SaveEventDTO info, Category category) throws Exception;
    boolean update(UpdateEventDTO info) throws Exception;
    boolean delete(UUID code) throws Exception;
    boolean changeEventStatus(UUID code) throws Exception;
}
