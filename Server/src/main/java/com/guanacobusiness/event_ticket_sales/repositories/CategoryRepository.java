package com.guanacobusiness.event_ticket_sales.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findByName(String name);
    Category findByCodeOrName(String code, String name);
}
