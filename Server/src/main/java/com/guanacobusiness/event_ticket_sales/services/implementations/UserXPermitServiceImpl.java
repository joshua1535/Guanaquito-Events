package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedUser;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXPermit;
import com.guanacobusiness.event_ticket_sales.repositories.UserXPermitRepository;
import com.guanacobusiness.event_ticket_sales.services.UserXPermitService;
import com.guanacobusiness.event_ticket_sales.utils.PageDTOMapper;
import com.guanacobusiness.event_ticket_sales.utils.UserMapper;
import com.guanacobusiness.event_ticket_sales.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserXPermitServiceImpl implements UserXPermitService{

    @Autowired
    UserXPermitRepository userXPermitRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserMapper userMapper;

    @Autowired
    PageDTOMapper pageDTOMapper;


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
        System.out.println(permit);
        if(permit == null) {
            return false;
        }

        UserXPermit userXPermit = userXPermitRepository.findOneByUserCodeAndPermitCode(userCode, permitCode);
        System.out.println(userXPermit);
        try {
            userXPermitRepository.delete(userXPermit);
            System.out.println("Deleted");

            return true;
        
        } catch (Exception e) {
        
            System.out.println(e.getMessage());
            return false;
        
        }

    }

    @Override
    public List<Permit> findPermitsByUserCode(UUID userCode) {

        User user = userService.findByCode(userCode);

        if(user == null) {
            return null;
        }

        List<Permit> permits = user.getUserXPermits().stream().map(UserXPermit::getPermit).toList();

        if(permits == null) {
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

    @Override
    public PageDTO<FormatedUser> findUsersByPermitCode(UUID permitCode, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserXPermit> users = userXPermitRepository.findByPermitCode(permitCode, pageable);

        if(users.isEmpty() || users == null) {
            return null;
        }
        
        List<FormatedUser> formatedUsers = userMapper.mapUserXPermit(users.getContent());
        PageDTO<FormatedUser> usersList = pageDTOMapper.map(formatedUsers, users);

        return usersList;
    }

}
