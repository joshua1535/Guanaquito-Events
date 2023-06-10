package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveCategoryDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.repositories.CategoryRepository;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;

import jakarta.transaction.Transactional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findCategoryByCode(String code) {
        return categoryRepository.findById(code).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean save(SaveCategoryDTO info) throws Exception{
        Category categoryFound = categoryRepository.findByCodeOrName(info.getCode(), info.getName());

        if (categoryFound != null) {
            return false;
        }
        Category newCategory = new Category(info.getCode(), info.getName());
        categoryRepository.save(newCategory);
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean update(SaveCategoryDTO info, Category categoryToUpdate) throws Exception{
        Category categoryExists = categoryRepository.findByName(info.getName());

        if (categoryExists != null) {
            return false;
        }
        
        categoryToUpdate.setName(info.getName());
        categoryRepository.save(categoryToUpdate);
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean delete(String code) throws Exception {
        Category categoryFound = categoryRepository.findById(code).orElse(null);
        if (categoryFound == null) {
            return false;
        }
        categoryRepository.deleteById(code);
        return true;
    }
    
}
