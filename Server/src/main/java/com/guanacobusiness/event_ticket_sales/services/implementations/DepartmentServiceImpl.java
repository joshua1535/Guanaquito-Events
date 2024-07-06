package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.DepartmentDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Department;
import com.guanacobusiness.event_ticket_sales.repositories.DepartmentRepository;
import com.guanacobusiness.event_ticket_sales.services.DepartmentService;
import com.guanacobusiness.event_ticket_sales.utils.DepartmentMapper;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DepartmentMapper departmentMapper;

    @Override
    public List<DepartmentDTO> findAllDepartments() {
        return departmentRepository.findAll().stream()
            .map(departmentMapper::toDTO)
            .collect(Collectors.toList());
    }

    @Override
    public DepartmentDTO findDepartmentByCode(String code) {
        Department depto = departmentRepository.findById(code)
        .orElseThrow(() -> new IllegalArgumentException("Department not found"));
        
        return departmentMapper.toDTO(depto);
    }

}
