package com.guanacobusiness.event_ticket_sales.models.dtos;

import com.guanacobusiness.event_ticket_sales.models.entities.Token;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenDTO {

	private String token;
	
	public TokenDTO(Token token) {
		this.token = token.getContent();
	}
	
}
