package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveCategoryDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<?> findAllCategories() {
        List<Category> categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> findCategoryByCode(@PathVariable(name = "code") String code) {
        Category category = categoryService.findCategoryByCode(code);

        if (category == null) {
            return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(category,HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> saveCategory(@RequestBody SaveCategoryDTO info ) {
        try {
            boolean saved = categoryService.save(info);
            if (saved) {
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            return new ResponseEntity<>("Category Already Exists",HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody SaveCategoryDTO info) {
        try {
            Category categoryFound = categoryService.findCategoryByCode(info.getCode());
            if (categoryFound == null) {
                return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
            }
            boolean updated = categoryService.update(info);
            if (updated == false) {
                return new ResponseEntity<>("Category Name already exist",HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Category updated successfully",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> deleteCategory(@PathVariable(name = "code") String code) {
        try {
            Category categoryFound = categoryService.findCategoryByCode(code);
            if (categoryFound == null) {
                return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
            }
            categoryService.delete(code);
            return new ResponseEntity<>("Category deleted successfully",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }  
}
