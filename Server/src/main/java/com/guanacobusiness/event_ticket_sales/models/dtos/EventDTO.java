package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {

    private UUID code;
    private String title;
    private String involvedPeople;
    private String image;
    private LocalDate date;
    private LocalTime time;
    private Integer duration;
    private String sponsors;
    private Category category;
    private EventLocationDTO eventLocation;
    private String weather;
    private Float temperature;
    private String demo;
}
