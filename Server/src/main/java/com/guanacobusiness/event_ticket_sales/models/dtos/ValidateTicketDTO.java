package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidateTicketDTO {

    @NotBlank(message = "The Validation code is required")
    @org.hibernate.validator.constraints.UUID(message = "User code must be a valid UUID")
    private String validationCode;

}
