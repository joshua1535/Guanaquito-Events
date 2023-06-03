package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;

public interface PermitService {

    List<Permit> findAllPermits();

}
