package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveCategoryDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;

public interface CategoryService {
    List<Category>findAllCategories();
    Category findCategoryByCode(String id);
    boolean save(SaveCategoryDTO info) throws Exception;
    boolean update(SaveCategoryDTO info) throws Exception;
    boolean deleteByCode(String code) throws Exception;

}
