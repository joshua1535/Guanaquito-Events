package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
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

    @Digits(integer=6, fraction=2)
    @DecimalMin("0.01")
    private BigDecimal price;

    @Positive(message = "Capacity must be greater than 0")
    private Integer capacity;
}
