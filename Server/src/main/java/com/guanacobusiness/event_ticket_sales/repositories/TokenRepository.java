package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Token;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface TokenRepository extends JpaRepository<Token, UUID>{
    
    List<Token> findByUserAndActive(User user, Boolean active);
    Token findByContent(String content);
    List<Token> findByActive(Boolean active);
}
