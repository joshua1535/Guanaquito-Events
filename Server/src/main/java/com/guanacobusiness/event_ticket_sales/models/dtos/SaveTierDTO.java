package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveTierDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Price is required")
    @Digits(integer=6, fraction=2)
    @DecimalMin("0.01")
    private BigDecimal price;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be greater than 0")
    private Integer capacity;

    @NotBlank(message = "Event code is required")
    @UUID(message = "Event code is not valid")
    private String eventCode;

}
