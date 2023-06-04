package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCategoryDTO {
    
    @NotEmpty(message = "Code is required")
    private String code;

    @NotEmpty(message = "Name is required")
    private String name;
}
