package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderDTO {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date purchaseDate;

}
