package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormatedRegisterDTO {
    
    private UUID code;
    private String transactionCode;
    private LocalTime creationTime;
    private Integer remainingMinutes;
    private Integer remainingSeconds;
    private LocalDateTime transferenceTime;
    private LocalDateTime validationTime;
}
