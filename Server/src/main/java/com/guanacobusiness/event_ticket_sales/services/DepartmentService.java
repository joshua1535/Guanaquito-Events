package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.dtos.DepartmentDTO;

public interface DepartmentService {

    List<DepartmentDTO>findAllDepartments();
    DepartmentDTO findDepartmentByCode(String code);
}
