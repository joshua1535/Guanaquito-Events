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
public class SaveTierDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Price is required")
    private BigDecimal price;

    @NotBlank(message = "Capacity is required")
    private Integer capacity;

    @NotBlank(message = "Event code is required")
    @UUID(message = "Event code is not valid")
    private String eventCode;

}
