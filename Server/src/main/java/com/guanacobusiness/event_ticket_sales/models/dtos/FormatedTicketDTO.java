package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormatedTicketDTO {

    private String ticketCode;

    private Boolean available;

    private String eventPicture;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventDate;

    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;

    private String eventTitle;

    private String ticketTier;

    private String eventCode;

}
