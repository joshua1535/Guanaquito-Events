package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.validator.constraints.UUID;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEventDTO {

    @NotEmpty(message = "Code is required")
    @UUID(message = "Event Code is not valid")
    private String code;
    
    private String title;

    private String involvedPeople;

    private String image;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;

    private Integer duration;

    private String sponsors;

    private String categoryCode;
}
