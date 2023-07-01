package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormatedUser {

    private UUID code;
    private String email;
    private String profilePicture;
    private Boolean active;
    private LocalDateTime dateAdded;
}
