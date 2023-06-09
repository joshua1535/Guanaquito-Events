package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface UserRepository extends ListCrudRepository<User, UUID>{

    public User findByEmailOrCode(String identifier, UUID code);
    public User findByCode(UUID code);
    public List<User> findByEmailContainingIgnoreCase(String username);
    public User findByEmail(String email);

}