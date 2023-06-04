package com.guanacobusiness.event_ticket_sales.models.dtos;

import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.Tier;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveTicketDTO {

    @NotBlank(message = "The Order code is required")
    private Order order;

    @NotBlank(message = "The tier code is required")
    private Tier tier;

    @NotBlank(message = "The User Owner code is required")
    private User userOwner;

}
