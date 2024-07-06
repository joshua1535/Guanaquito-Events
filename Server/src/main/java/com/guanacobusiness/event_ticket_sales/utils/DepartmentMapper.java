package com.guanacobusiness.event_ticket_sales.utils;

import org.locationtech.jts.io.WKTWriter;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.DepartmentDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Department;

@Component
public class DepartmentMapper {

    public DepartmentDTO toDTO(Department department){
        WKTWriter writer = new WKTWriter();
        DepartmentDTO departmentDTO = new DepartmentDTO(
            department.getCode(),
            department.getName(),
            writer.write(department.getGeometry())
        );
        return departmentDTO;
    }
}
