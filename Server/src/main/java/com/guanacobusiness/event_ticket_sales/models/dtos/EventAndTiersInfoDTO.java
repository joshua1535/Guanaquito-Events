package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventAndTiersInfoDTO {
    private Integer EventCapacity;
    private Integer EventRemainingCapacity;
    List<TierInfoDTO> tiers;
}
