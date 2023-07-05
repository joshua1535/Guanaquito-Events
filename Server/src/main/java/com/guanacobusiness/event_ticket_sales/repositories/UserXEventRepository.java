package com.guanacobusiness.event_ticket_sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.models.entities.UserXEvent;

public interface UserXEventRepository extends JpaRepository<UserXEvent,UUID>{
    UserXEvent findByUserCodeAndEventCode(UUID userCode, UUID eventCode);
    List<User> findUsersByEventCode(UUID eventCode);
    List<Event> findEventsByUserCode(UUID userCode);
    void deleteByUserCodeAndEventCode(UUID userCode, UUID eventCode) throws Exception;

}
