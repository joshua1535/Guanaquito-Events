package com.guanacobusiness.event_ticket_sales.models.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeOwnershipDTO {

    private String newUserOwnerCode;

    @NotBlank(message = "The Transfer code is required")
    //@UUID(message = "Transference code must be a valid UUID")
    private String transferCode;

}
