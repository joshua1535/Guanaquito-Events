package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveEventDTO {
    
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Involved people is required")
    private String involvedPeople;

    @NotBlank(message = "Image is required")
    private String image;

    @NotNull(message = "Date is required")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotNull(message = "Time is required")
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be greater than 0")
    private Integer duration;

    @NotBlank(message = "Sponsors is required")
    private String sponsors;

    @NotBlank(message = "Category is required")
    private String categoryCode;
}
