package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventLocationDTO {
    private UUID code;
    private String geometry;
    private Double latitude;
    private Double longitude;
    private String name;
    private String address;
}
