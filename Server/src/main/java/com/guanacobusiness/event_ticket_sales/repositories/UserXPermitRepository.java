package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXPermit;

public interface UserXPermitRepository extends JpaRepository<UserXPermit, UUID>{

    void deleteOneByCode(UUID code) throws Exception;
    void deleteByUserCodeAndPermitCode(UUID userCode, UUID permitCode) throws Exception;
    List<Permit> findPermitsByUserCode(UUID userCode);
    List<User> findUsersByPermitCode(UUID permitCode);
    //Page<User> findUsersByPermitCode(UUID permitCode, Pageable pageable);
    Page<UserXPermit> findByPermitCode(UUID permitCode, Pageable pageable);
    UserXPermit findOneByUserCodeAndPermitCode(UUID userCode, UUID permitCode);
    UserXPermit findByCode(UUID code);

}
