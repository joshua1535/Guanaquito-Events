package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedUser;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXEvent;
import com.guanacobusiness.event_ticket_sales.repositories.UserXEventRepository;
import com.guanacobusiness.event_ticket_sales.services.EventService;
import com.guanacobusiness.event_ticket_sales.services.UserXEventService;
import com.guanacobusiness.event_ticket_sales.utils.UserMapper;

import jakarta.transaction.Transactional;

@Service
public class UserXEventServiceImpl implements UserXEventService{

    @Autowired
    UserXEventRepository userXEventRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    EventService eventService;

    @Override
    public List<UserXEvent> findAll() {
        return userXEventRepository.findAll();
    }

    @Override
    public UserXEvent findByUserAndEvent(UUID userCode, UUID eventCode) {
        UserXEvent foundUserXEvent = userXEventRepository.findByUserCodeAndEventCode(userCode, eventCode);

        if(foundUserXEvent == null) {
            return null;
        }

        return foundUserXEvent;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean save(User user, Event event) throws Exception {

        UserXEvent foundUserXEvent = userXEventRepository.findByUserCodeAndEventCode(user.getCode(), event.getCode());

        if(foundUserXEvent != null) {
            return false;
        }

        UserXEvent newUserXEvent = new UserXEvent(event, user);

        userXEventRepository.save(newUserXEvent);

        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean delete(UUID userCode, UUID eventCode) throws Exception {
        UserXEvent foundUserXEvent = userXEventRepository.findByUserCodeAndEventCode(userCode, eventCode);
        System.out.println("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII" + foundUserXEvent);

        if(foundUserXEvent == null) {
            return false;
        }

        userXEventRepository.delete(foundUserXEvent);

        return true;
    }

    @Override
    public List<Event> findEventsByUserCode(UUID userCode) {
        List<Event> eventList = userXEventRepository.findEventsByUserCode(userCode);

        if(eventList == null || eventList.isEmpty()) {
            return null;
        }

        return eventList;
    }

    @Override
    public List<FormatedUser> findUsersByEventCode(UUID eventCode) {

        Event foundEvent = eventService.findEventByCode(eventCode);

        List<User> userList = foundEvent.getUserXEvents().stream().map(UserXEvent::getUser).toList();

        if(userList == null || userList.isEmpty()) {
            return null;
        }

        List<FormatedUser> formatedUsers = userMapper.map(userList);

        return formatedUsers;
    }

    
    
    
}