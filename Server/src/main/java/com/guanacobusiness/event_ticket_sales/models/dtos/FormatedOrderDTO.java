package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormatedOrderDTO {
    
    private UUID orderCode;

    private Date orderDate;

    List<EventAndTicketInfoDTO> tickets;

    private BigDecimal totalOrder;
}
