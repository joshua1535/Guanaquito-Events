package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.repositories.PermitRepository;
import com.guanacobusiness.event_ticket_sales.services.PermitService;

@Service
public class PermitServiceImpl implements PermitService{

    @Autowired
    PermitRepository permitRepository;

    @Override
    public List<Permit> findAllPermits() {
        return permitRepository.findAll();
    }

}
