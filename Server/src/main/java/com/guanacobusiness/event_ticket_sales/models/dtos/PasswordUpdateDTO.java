package com.guanacobusiness.event_ticket_sales.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateDTO {

    private String userCode;

    @NotEmpty(message = "Username or email required")
    @NotBlank(message = "No blanks allowed")
    private String identifier;

    @NotEmpty(message = "Actual password is required")
    @NotBlank(message = "No blanks allowed")
    @Size(min = 6, max = 20)
	private String password;

    @NotEmpty(message = "The new password is required")
    @NotBlank(message = "No blanks allowed")
    @Size(min = 6, max = 20)
	private String newPassword;


}
