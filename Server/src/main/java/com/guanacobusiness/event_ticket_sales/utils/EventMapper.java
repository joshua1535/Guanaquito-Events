package com.guanacobusiness.event_ticket_sales.utils;

import org.locationtech.jts.io.WKTWriter;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.EventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.EventLocationDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedDepartmentDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;

@Component
public class EventMapper {

    public EventDTO toDTO(Event event){
        WKTWriter writer = new WKTWriter();
        EventDTO eventDTO = new EventDTO(
            event.getCode(),
            event.getTitle(),
            event.getInvolvedPeople(),
            event.getImage(),
            event.getDate(),
            event.getTime(),
            event.getDuration(),
            event.getSponsors(),
            event.getCategory(),
            new EventLocationDTO(
                event.getEventLocation().getCode(),
                writer.write(event.getEventLocation().getGeometry()),
                event.getEventLocation().getLatitude(),
                event.getEventLocation().getLongitude(),
                event.getEventLocation().getName(),
                event.getEventLocation().getAddress(),
                new FormatedDepartmentDTO(
                    event.getEventLocation().getDepartment().getCode(),
                    event.getEventLocation().getDepartment().getName()
                )
            ),
            event.getWeather(),
            event.getTemperature(),
            event.getDemo()
        );
        return eventDTO;
    }
}
