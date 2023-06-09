package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GetTicketsDTO {
    
    @NotBlank(message = "The User code is required")
    private UUID userOwnerCode;

}
