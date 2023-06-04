package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXPermit;

public interface UserXPermitRepository extends ListCrudRepository<UserXPermit, UUID>{

    Boolean save(User user, Permit permit) throws Exception;
    void deleteOneByCode(UUID code) throws Exception;
    Boolean deleteByUserCodeAndPermitCode(UUID userCode, UUID permitCode) throws Exception;
    List<Permit> findPermitsByUserCode(UUID userCode);
    UserXPermit findOneByUserCodeAndPermitCode(UUID userCode, UUID permitCode);

}
