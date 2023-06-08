package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.PermitService;
import com.guanacobusiness.event_ticket_sales.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    PermitService permitService;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByCode(UUID code) {
        User userfound = userRepository.findByCode(code);

        return userfound;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean register(SaveUserDTO user) throws Exception {
        
        User newUser = new User(user.getEmail(), user.getPassword(), user.getProfilePicture());

        if (newUser.getEmail().isEmpty() || newUser.getPassword().isEmpty()) {
            throw new Exception("Cannot register user with empty email or password");
        }
        User userComparation = userRepository.findByEmailOrCode(newUser.getEmail(), newUser.getCode());
        if (userComparation != null) {
            return false;
        }

        userRepository.save(newUser);
        return true;

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean updatePassword(PasswordUpdateDTO userUpdateDTO, String newPassword) throws Exception {
        User foundUser = userRepository.findByCode(UUID.fromString(userUpdateDTO.getUserCode()));

        if(foundUser == null){
            return false;
        }

        User updatedUser = new User(foundUser.getCode(), foundUser.getEmail(),newPassword, foundUser.getProfilePicture());

        userRepository.save(updatedUser);

        return true;
    }

    @Override
    public List<User> findByFragment(String fragment) {
        List<User> usersFound = userRepository.findByUsernameContainingIgnoreCase(fragment);

        return usersFound;
    }

    @Override
    public List<User> findByPermit(UUID permitCode) {
    
        Permit permitFound = permitService.findPermitByCode(permitCode);

        if(permitFound == null){
            return null;
        }

        List<User> usersFound = userRepository.findByPermitCode(permitFound.getCode());

        if(usersFound == null || usersFound.isEmpty()){
            return null;
        }

        return usersFound;

    public boolean login(AuthRequestDTO info) {
        
        User user = userRepository.findByEmail(info.getIdentifier());

        if(user == null){
            return false;
        }

        if(!user.getPassword().equals(info.getPassword())){
            return false;
        }

        return true;
    }

}