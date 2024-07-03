package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.locationtech.jts.io.WKTWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.EventLocationDTO;
import com.guanacobusiness.event_ticket_sales.repositories.EventLocationRepository;
import com.guanacobusiness.event_ticket_sales.services.EventLocationService;

@Service
public class EventLocationServiceImpl implements EventLocationService{

    @Autowired
    private EventLocationRepository eventLocationRepository;

    @Override
    public List<EventLocationDTO> findAllEventLocations() {
        WKTWriter writer = new WKTWriter();

        return eventLocationRepository.findAll().stream()
            .map(eventLocation -> new EventLocationDTO(
                eventLocation.getCode(),
                writer.write(eventLocation.getGeometry()),
                eventLocation.getLatitude(),
                eventLocation.getLongitude(),
                eventLocation.getName(),
                eventLocation.getAddress())
            )
            .collect(Collectors.toList());
    }

}
