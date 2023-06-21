package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Token;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface UserService {

    List<User> findAll();
    User findByCode(UUID code);
    boolean register(SaveUserDTO user) throws Exception;
    boolean updatePassword(PasswordUpdateDTO userUpdateDTO, String newPassword) throws Exception;
    List<User> findByFragment(String fragment);
    List<User> findByPermit(UUID permitCode);
    User login(AuthRequestDTO info);
    Token registerToken(User user) throws Exception;
	Boolean isTokenValid(User user, String token);
	void cleanTokens(User user) throws Exception;
    User findByEmail(String email);
    User findUserAuthenticated();
    Boolean comparePassword(String toCompare, String current);

}