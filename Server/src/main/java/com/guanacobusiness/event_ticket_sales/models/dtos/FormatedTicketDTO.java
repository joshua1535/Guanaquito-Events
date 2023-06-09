package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.sql.Time;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormatedTicketDTO {
    
    private Boolean available;

    private String eventPicture;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date eventDate;

    @DateTimeFormat(pattern = "HH:mm")
    private Time time;

    private String eventTitle;

    private String ticketTier;

}
