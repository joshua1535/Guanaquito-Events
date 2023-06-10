package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SaveCategoryDTO {
    
    @NotBlank(message = "Code is required")
	@Pattern(regexp = "^[A-Z0-9]{4}$", message = "Code must have exactly 4 uppercase alphanumeric chars")
	private String code;
	
	@NotBlank(message = "Name is required")
	@Size(min = 5, message = "Name must have at least 5 chars")
	private String name;
}
