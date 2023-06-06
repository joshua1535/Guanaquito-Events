package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeOwnershipDTO {

    @NotBlank(message = "The New User Owner code is required")
    private UUID newUserOwnerCode;

    @NotBlank(message = "The Transfer code is required")
    private String transferCode;

}
