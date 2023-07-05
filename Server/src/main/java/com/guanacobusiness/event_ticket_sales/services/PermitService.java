package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;

public interface PermitService {

    List<Permit> findAllPermits();
    Permit findPermitByCode(UUID code);
    Permit findPermitByName(String name);

}
