package com.guanacobusiness.event_ticket_sales.utils;

import java.util.List;

import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedUser;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXPermit;

@Component
public class UserMapper {
    
    public FormatedUser map(User user){
        FormatedUser formatedUser = new FormatedUser(
            user.getCode(),
            user.getEmail(),
            user.getProfilePicture(),
            user.getActive(),
            user.getDateAdded()
        );
        return formatedUser;
    }

    public List<FormatedUser> map(List<User> users){ 
        return users.stream().map(user -> map(user)).toList();
    }

    public List<FormatedUser> mapUserXPermit(List<UserXPermit> list){
        return list.stream().map(userXPermit -> map(userXPermit.getUser())).toList();
    }

}
