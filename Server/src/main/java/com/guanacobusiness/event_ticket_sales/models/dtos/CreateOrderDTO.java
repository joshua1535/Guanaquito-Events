package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderDTO {

    @org.hibernate.validator.constraints.UUID(message = "User code must be a valid UUID")
    @NotBlank(message = "The User code is required")
    private String userCode;

    @NotBlank(message = "The Purchase Date is required")
    private Date purchaseDate;
}
