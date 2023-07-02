package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveCategoryDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<?> findAllCategories(HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<Category> categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> findCategoryByCode(@PathVariable(name = "code") String code, HttpServletRequest request) {
    
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }
    
        Category category = categoryService.findCategoryByCode(code);

        if (category == null) {
            return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(category,HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> saveCategory(@Valid @RequestBody SaveCategoryDTO info, HttpServletRequest request ) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            boolean saved = categoryService.save(info);
            if (saved) {
                return new ResponseEntity<>("Category Created successfully",HttpStatus.CREATED);
            }
            return new ResponseEntity<>("Category Already Exists",HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/update")
    public ResponseEntity<?> updateCategory(@Valid @RequestBody SaveCategoryDTO info, HttpServletRequest request) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            Category categoryFound = categoryService.findCategoryByCode(info.getCode());
            if (categoryFound == null) {
                return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
            }
            boolean updated = categoryService.update(info, categoryFound);
            if (updated == false) {
                return new ResponseEntity<>("Category Name already exist",HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>("Category updated successfully",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> deleteCategory(@PathVariable(name = "code") String code, HttpServletRequest request ) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            Boolean statusDelete = categoryService.delete(code);

            if (statusDelete == false) {
                return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("Category deleted successfully",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }  

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
    MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
