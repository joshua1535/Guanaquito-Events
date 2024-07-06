package com.guanacobusiness.event_ticket_sales.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findByName(String name);
    Category findByCodeOrName(String code, String name);

    //Esto se ocupara para la recomendacion de eventos
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.tier.event.category.code = :categoryCode AND t.userOwner.code = :ownerCode")
    Integer countCategoryByOwnerCode(String categoryCode, UUID ownerCode);
}
