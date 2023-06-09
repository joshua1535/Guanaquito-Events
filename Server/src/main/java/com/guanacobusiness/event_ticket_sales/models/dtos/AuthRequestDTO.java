package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDTO {

    @NotEmpty(message = "User cannot be empty")
    private String identifier;

    @NotEmpty(message = "Password cannot be empty")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()!]).{8,}$",
    message = "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character")
	private String password;

}
