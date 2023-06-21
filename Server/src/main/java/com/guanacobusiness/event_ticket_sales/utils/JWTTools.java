package com.guanacobusiness.event_ticket_sales.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.entities.Token;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.TokenRepository;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;



@Component
public class JWTTools {
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.exptime}")
	private Integer exp;

    @Autowired
    TokenRepository tokenRepository;

    public String generateToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		
		return Jwts.builder()
			.addClaims(claims)
			.setSubject(user.getUsername())
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + exp))
			.signWith(Keys.hmacShaKeyFor(secret.getBytes()))
			.compact();
	}

    public Boolean verifyToken(String token) {
		try {
			JwtParser parser = Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
					.build();
				
			parser.parse(token);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}		
	}

    public String getUsernameFrom(String token) {
		try {
			JwtParser parser = Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
					.build();
				
			return parser.parseClaimsJws(token)
					.getBody()
					.getSubject();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}		
	}

    public Boolean compareToken(String tokenToCompare) {

        Token token = tokenRepository.findByContent(tokenToCompare);

        if (token == null) {
            return false;
        }

        String email = getUsernameFrom(token.getContent());

        if (!email.equals(getUsernameFrom(tokenToCompare))) {
            return false;
        }

        System.out.println("\n email de la base: " + email + "\n" + "email del token: " + getUsernameFrom(tokenToCompare) + "\n");

        return true;
    }

}
