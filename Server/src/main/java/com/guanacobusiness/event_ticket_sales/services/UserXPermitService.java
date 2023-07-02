package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedUser;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXPermit;

public interface UserXPermitService {

    List<UserXPermit> findAll();
    Boolean save(User user, Permit permit) throws Exception;
    Boolean deleteByCode(UUID code) throws Exception;
    Boolean deleteByUserCodeAndPermitCode(UUID userCode, UUID permitCode) throws Exception;
    List<Permit> findPermitsByUserCode(UUID userCode);
    List<User> findUsersByPermitCode(UUID permitCode);
    PageDTO<FormatedUser> findUsersByPermitCode(UUID permitCode, int page, int size);

}
