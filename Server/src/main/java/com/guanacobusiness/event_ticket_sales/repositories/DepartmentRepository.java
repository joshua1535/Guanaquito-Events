package com.guanacobusiness.event_ticket_sales.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, String>{

}
