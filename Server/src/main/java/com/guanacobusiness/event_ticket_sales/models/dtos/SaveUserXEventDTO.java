package com.guanacobusiness.event_ticket_sales.models.dtos;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveUserXEventDTO {

    @NotBlank(message = "userCode is required")
    @UUID(message = "Invalid User code")
    private String userCode;

    @NotBlank(message = "eventCode is required")
    @UUID(message = "Invalid Event code")
    private String eventCode;
}
