package com.guanacobusiness.event_ticket_sales.models.dtos;


import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveTicketDTO {

    @NotBlank(message = "The Order code is required")
    @UUID(message = "The Order code must be a valid UUID")
    private String order;

    @NotBlank(message = "The tier code is required")
    @UUID(message = "The Order code must be a valid UUID")
    private String tier;

    private String userOwner;

}
