package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstrutor
@NoArgsConstructor
public class ModifyPermitDTO {
    
    @NotEmpty(message = "Permit code cannot be empty")
    @org.hibernate.validator.constraints.UUID(message = "User code must be a valid UUID")
    private UUID permitCode;

}
