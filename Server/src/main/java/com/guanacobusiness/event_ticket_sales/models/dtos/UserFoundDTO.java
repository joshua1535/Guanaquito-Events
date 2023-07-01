package com.guanacobusiness.event_ticket_sales.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFoundDTO {

    private String email;
    private String profilePicture;

}
