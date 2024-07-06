package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.DepartmentDTO;
import com.guanacobusiness.event_ticket_sales.services.DepartmentService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;
    
    @GetMapping("/all")
    public ResponseEntity<?> GetAllDepartments(HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<DepartmentDTO> response = departmentService.findAllDepartments();

        if (response.isEmpty()) {
            return new ResponseEntity<>("No Departments Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> GetOneDepartment(@PathVariable(name = "code") String code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        try {
            DepartmentDTO response = departmentService.findDepartmentByCode(code);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
