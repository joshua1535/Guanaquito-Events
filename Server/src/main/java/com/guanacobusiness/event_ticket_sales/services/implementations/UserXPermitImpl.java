package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXPermit;
import com.guanacobusiness.event_ticket_sales.repositories.UserXPermitRepository;
import com.guanacobusiness.event_ticket_sales.services.UserXPermitService;

import jakarta.transaction.Transactional;

@Service
public class UserXPermitImpl implements UserXPermitService{

    @Autowired
    UserXPermitRepository userXPermitRepository;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean save(User user, Permit permit) throws Exception {
        
        UserXPermit userXPermit = new UserXPermit(user, permit);

        UserXPermit foundUserXPermit = userXPermitRepository.findOneByUserCodeAndPermitCode(user.getCode(), permit.getCode());
        
        if(foundUserXPermit != null) {
            return false;
        }

        userXPermitRepository.save(userXPermit);

        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean deleteByCode(UUID code) throws Exception {
        UserXPermit permit = userXPermitRepository.findByCode(code);

        if(permit == null) {
            return false;
        }

        userXPermitRepository.deleteOneByCode(code);

        return true;

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean deleteByUserCodeAndPermitCode(UUID userCode, UUID permitCode) throws Exception {
        UserXPermit permit = userXPermitRepository.findOneByUserCodeAndPermitCode(userCode, permitCode);

        if(permit == null) {
            return false;
        }

        userXPermitRepository.deleteByUserCodeAndPermitCode(userCode, permitCode);

        return true;
    }

    @Override
    public List<Permit> findPermitsByUserCode(UUID userCode) {
        List<Permit> permits = userXPermitRepository.findPermitsByUserCode(userCode);

        if(permits.isEmpty()) {
            return null;
        }

        return permits;
    }

    @Override
    public List<UserXPermit> findAll() {
        return userXPermitRepository.findAll();
    }

    @Override
    public List<User> findUsersByPermitCode(UUID permitCode) {
        List<User> users = userXPermitRepository.findUsersByPermitCode(permitCode);

        if(users.isEmpty()) {
            return null;
        }

        return users;
    }

}
