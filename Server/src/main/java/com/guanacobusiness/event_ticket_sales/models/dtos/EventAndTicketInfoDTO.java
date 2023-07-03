package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventAndTicketInfoDTO {

    private String eventPicture;

    private String eventTitle;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventDate;

    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime eventTime;

    private String ticketTier;

    private BigDecimal ticketPrice;
}
