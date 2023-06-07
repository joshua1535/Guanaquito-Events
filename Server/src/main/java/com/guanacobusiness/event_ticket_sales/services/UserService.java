package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface UserService {

    List<User> findAll();
    User findByCode(UUID code);
    boolean register(SaveUserDTO user) throws Exception;
    boolean updatePassword(PasswordUpdateDTO userUpdateDTO, String newPassword) throws Exception;
    List<User> findByFragment(String fragment);
    boolean login(AuthRequestDTO info);

}
