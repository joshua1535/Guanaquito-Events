package com.guanacobusiness.event_ticket_sales.models.dtos;

//import java.time.LocalTime;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveEventDTO {
    
    @NotEmpty(message = "Title is required")
    private String title;

    @NotEmpty(message = "Involved people is required")
    private String involvedPeople;

    @NotEmpty(message = "Image is required")
    private String image;

    @NotEmpty(message = "Date is required")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    @NotEmpty(message = "Time is required")
    @DateTimeFormat(pattern = "HH:mm")
    private java.sql.Time time;
    //private LocalTime time;

    @NotEmpty(message = "Duration is required")
    private Integer duration;

    @NotEmpty(message = "Sponsors is required")
    private String sponsors;

    @NotEmpty(message = "Category is required")
    private String categoryCode;
}
