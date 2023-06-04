package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.Date;

import com.guanacobusiness.event_ticket_sales.models.entities.User;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderDTO {

    @NotBlank(message = "The User code is required")
    private User user;

    @NotBlank(message = "The Purchase Date is required")
    private Date purchaseDate;
}
