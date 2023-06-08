package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeOwnershipDTO {

    @NotBlank(message = "The New User Owner code is required")
    @org.hibernate.validator.constraints.UUID(message = "User code must be a valid UUID")
    private String newUserOwnerCode;

    @NotBlank(message = "The Transfer code is required")
    @org.hibernate.validator.constraints.UUID(message = "Transference code must be a valid UUID")
    private String transferCode;

}
