package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTierDTO {
    
    @NotBlank(message = "Code is required")
    @UUID(message = "Code is not valid")
    private String code;

    private String name;

    private BigDecimal price;

    private Integer capacity;
}
