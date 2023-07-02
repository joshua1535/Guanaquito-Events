package com.guanacobusiness.event_ticket_sales.models.dtos;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveRegisterDTO {
    
    @NotBlank(message = "Code is required")
    //@UUID(message = "Event Code is not valid")
    private String transactionCode;

    @NotBlank(message = "Code is required")
    @UUID(message = "Event Code is not valid")
    private String ticketCode;
}
