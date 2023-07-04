package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifyPermitDTO {
    
    @NotEmpty(message = "Permit code cannot be empty")
    @org.hibernate.validator.constraints.UUID(message = "User code must be a valid UUID")
    private String permitCode;

    @NotEmpty(message = "Permit code cannot be empty")
    @org.hibernate.validator.constraints.UUID(message = "User code must be a valid UUID")
    private String userCode;

}
