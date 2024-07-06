package com.guanacobusiness.event_ticket_sales.utils;

import org.locationtech.jts.io.WKTWriter;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.EventLocationDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedDepartmentDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.EventLocation;

@Component
public class EventLocationMapper {

    public EventLocationDTO toDTO(EventLocation eventLocation){
        WKTWriter writer = new WKTWriter();
        EventLocationDTO eventLocationDTO = new EventLocationDTO(
            eventLocation.getCode(),
            writer.write(eventLocation.getGeometry()),
            eventLocation.getLatitude(),
            eventLocation.getLongitude(),
            eventLocation.getName(),
            eventLocation.getAddress(),
            new FormatedDepartmentDTO(
                eventLocation.getDepartment().getCode(),
                eventLocation.getDepartment().getName())
        );
        return eventLocationDTO;
    }
}
