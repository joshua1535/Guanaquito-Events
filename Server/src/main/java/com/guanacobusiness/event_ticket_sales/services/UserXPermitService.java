package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;



import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface UserXPermitService {

    Boolean save(User user, Permit permit) throws Exception;
    void deleteByCode(UUID code) throws Exception;
    void deleteByUserCodeAndPermitCode(UUID userCode, UUID permitCode) throws Exception;
    List<Permit> findPermitsByUserCode(UUID userCode);

}
