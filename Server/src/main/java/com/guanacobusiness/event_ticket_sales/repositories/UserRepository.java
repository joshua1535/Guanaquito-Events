package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface UserRepository extends JpaRepository<User, UUID>{

    Page<User> findAll(Pageable pageable);
    Page<User> findByEmailContainingIgnoreCase(String email, Pageable pageable);
    public User findByEmailOrCode(String identifier, UUID code);
    public User findByCode(UUID code);
    public List<User> findByEmailContainingIgnoreCase(String email);
    public User findByEmail(String email);

}