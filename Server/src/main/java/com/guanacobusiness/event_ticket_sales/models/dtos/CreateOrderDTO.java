package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.Date;
import org.hibernate.validator.constraints.UUID;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderDTO {

    @UUID(message = "User code must be a valid UUID")
    @NotBlank(message = "The User code is required")
    private String userCode;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date purchaseDate;
}
