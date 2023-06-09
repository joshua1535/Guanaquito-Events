package com.guanacobusiness.event_ticket_sales.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmountOfTicketsSoldDTO {
    
    private Integer amountOfTicketSold;
    private Integer totalCapacity;
}