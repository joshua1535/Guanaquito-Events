package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TierMoneyCollectedDTO {
    
    private UUID code;
    private String name;
    private BigDecimal moneyCollected;
}
