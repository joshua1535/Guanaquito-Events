package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.dtos.EventLocationDTO;

public interface EventLocationService {
    List<EventLocationDTO>findAllEventLocations();
}
