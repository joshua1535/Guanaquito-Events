package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedUser;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXEvent;

public interface UserXEventService {
    List<UserXEvent> findAll();
    UserXEvent findByUserAndEvent(UUID userCode, UUID eventCode);
    Boolean save(User user, Event event) throws Exception;
    Boolean delete(UUID userCode, UUID eventCode) throws Exception;
    List<Event>findEventsByUserCode(UUID userCode);
    List<FormatedUser>findUsersByEventCode(UUID eventCode);
}
