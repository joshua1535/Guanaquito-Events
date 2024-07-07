package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendedTierDTO {
    private String name;
    private BigDecimal price;
    private Integer capacity;
}
