package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidateTicketDTO {

    @NotBlank(message = "The User Owner code is required")
    private UUID userOwnerCode;

    @NotBlank(message = "The Validation code is required")
    private String validationCode;

}
