package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.AuthRequestDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PasswordUpdateDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveUserDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Permit;
import com.guanacobusiness.event_ticket_sales.models.entities.Token;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.repositories.TokenRepository;
import com.guanacobusiness.event_ticket_sales.repositories.UserRepository;
import com.guanacobusiness.event_ticket_sales.services.PermitService;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.services.UserXPermitService;
import com.guanacobusiness.event_ticket_sales.utils.JWTTools;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    PermitService permitService;

    @Autowired
    UserXPermitService userXPermitService;

    @Autowired
	private JWTTools jwtTools;
	
	@Autowired
	private TokenRepository tokenRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

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
        
        User newUser = new User(user.getEmail(), passwordEncoder.encode(user.getPassword()), user.getProfilePicture());

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
        List<User> usersFound = userRepository.findByEmailContainingIgnoreCase(fragment);

        return usersFound;
    }

    @Override
    public List<User> findByPermit(UUID permitCode) {
    
        Permit permitFound = permitService.findPermitByCode(permitCode);

        if(permitFound == null){
            return null;
        }

        List<User> usersFound = userXPermitService.findUsersByPermitCode(permitFound.getCode());

        if(usersFound == null || usersFound.isEmpty()){
            return null;
        }

        return usersFound;
    }
    
    @Override
    public User login(AuthRequestDTO info) {
        
        User user = userRepository.findByEmail(info.getIdentifier());

        if(user == null){
            return null;
        }

        return user;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token registerToken(User user) throws Exception {
        cleanTokens(user);
            
        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);
            
        tokenRepository.save(token);
            
        return token;
    }

    @Override
    public Boolean isTokenValid(User user, String token) {
        try {
            cleanTokens(user);
            List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
                
            tokens.stream()
                .filter(tk -> tk.getContent().equals(token))
                .findAny()
                .orElseThrow(() -> new Exception());
            
            return true;
        } catch (Exception e) {
            return false;
        }		
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) throws Exception {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
            
        tokens.forEach(token -> {
            if(!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });
            
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
	public User findUserAuthenticated() {
		String email = SecurityContextHolder
			.getContext()
			.getAuthentication()
			.getName();
		
		return userRepository.findByEmail(email);
	}

    @Override
    public Boolean comparePassword(String toCompare, String current) {
        return passwordEncoder.matches(toCompare, current);
    }

}
