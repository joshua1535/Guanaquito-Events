package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFoundDTO {

    private String email;
    private String profilePicture;
    private List<Permit> permits;

}
