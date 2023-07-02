package com.guanacobusiness.event_ticket_sales.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UserFoundDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Token;
import com.guanacobusiness.event_ticket_sales.models.entities.User;

public interface UserService {

    List<User> findAll();
    Page<User> findAll(int page, int size);
    User findByCode(UUID code);
    boolean register(SaveUserDTO user) throws Exception;
    boolean updatePassword(PasswordUpdateDTO userUpdateDTO, String newPassword) throws Exception;
    List<User> findByFragment(String fragment);
    Page<User> findByFragment(String fragment, int page, int size);
    List<User> findByPermit(UUID permitCode);
    //Page<User> findByPermit(UUID permitCode, int page, int size);
    User login(AuthRequestDTO info);
    Token registerToken(User user) throws Exception;
	Boolean isTokenValid(User user, String token);
	void cleanTokens(User user) throws Exception;
    void cleanTokens() throws Exception;
    User findByEmail(String email);
    User findUserAuthenticated();
    Boolean comparePassword(String toCompare, String current);
    UserFoundDTO whoami(String email);

}