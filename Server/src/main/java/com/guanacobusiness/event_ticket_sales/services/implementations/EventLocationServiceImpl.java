package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.EventLocationDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.EventLocation;
import com.guanacobusiness.event_ticket_sales.repositories.EventLocationRepository;
import com.guanacobusiness.event_ticket_sales.services.EventLocationService;
import com.guanacobusiness.event_ticket_sales.utils.EventLocationMapper;

@Service
public class EventLocationServiceImpl implements EventLocationService{

    @Autowired
    private EventLocationRepository eventLocationRepository;

    @Autowired
    private EventLocationMapper eventLocationMapper;

    @Override
    public List<EventLocationDTO> findAllEventLocations() {
        return eventLocationRepository.findAll().stream()
            .map(eventLocationMapper::toDTO)
            .collect(Collectors.toList());
    }

    @Override
    public EventLocationDTO findEventLocationByCode(UUID code) {
        EventLocation eventLocation = eventLocationRepository.findById(code)
        .orElseThrow(() -> new IllegalArgumentException("Event Location not found"));

        return eventLocationMapper.toDTO(eventLocation);
    }

    @Override
    public List<EventLocationDTO> findEventLocationsByDepartment(String code) {
        List<EventLocation> eventLocations = eventLocationRepository.findByDepartmentCode(code);

        if(eventLocations.isEmpty()){
            throw new IllegalArgumentException("No Event Locations Found");
        }

        return eventLocations.stream()
            .map(eventLocationMapper::toDTO)
            .collect(Collectors.toList());
    }

}
