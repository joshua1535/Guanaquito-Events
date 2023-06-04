package com.guanacobusiness.event_ticket_sales.repositories;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Category;

public interface CategoryRepository extends ListCrudRepository<Category, String> {
    Category findByName(String name);
}
