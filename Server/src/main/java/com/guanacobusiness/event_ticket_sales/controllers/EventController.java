package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;
import com.guanacobusiness.event_ticket_sales.services.EventService;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.services.UserXEventService;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private StringToUUID stringToUUID;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserXEventService userXEventService;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllEvents() {
        List<Event> events = eventService.findAllEvents();

        if(events == null || events.isEmpty()){
            return new ResponseEntity<>("No Events Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }
    
    @GetMapping("/{code}")
    public ResponseEntity<?> findEventByCode(@PathVariable(name = "code") String code) {

        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        Event event = eventService.findEventByCode(uuid);

        if (event == null) {
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(event,HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<?> getAllActiveEvents() {
        List<Event> events = eventService.findAllActiveEvents();

        if (events.isEmpty()) {
            return new ResponseEntity<>("No Active Events Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/inactive")
    public ResponseEntity<?> getAllInactiveEvents() {
        List<Event> events = eventService.findAllInactiveEvents();

        if (events.isEmpty()) {
            return new ResponseEntity<>("No Inactive Events Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<?> getAllCurrentEvents() {
        List<Event> events = eventService.findAllCurrentEvents();

        if (events.isEmpty()) {
            return new ResponseEntity<>("No Current Events found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/archived")
    public ResponseEntity<?> getAllArchivedEvents() {
        List<Event> events = eventService.findAllArchivedEvents();

        if (events.isEmpty()) {
            return new ResponseEntity<>("No Archived Events Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/category/{code}")
    public ResponseEntity<?> findAllEventsByCategory(@PathVariable(name = "code") String code) {
        Category category = categoryService.findCategoryByCode(code);

        if (category == null) {
            return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
        }

        List<Event> events = category.getEvents();

        if (events.isEmpty() || events == null) {
            return new ResponseEntity<>("No Events Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/user/{code}")
    public ResponseEntity<?> findAllEventsByUser(@PathVariable(name = "code") String code) {
        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByCode(uuid);

        if (user == null) {
            return new ResponseEntity<>("User Not Found",HttpStatus.NOT_FOUND);
        }

        List<Event> events = userXEventService.findEventsByUserCode(uuid);

        if (events.isEmpty() || events == null) {
            return new ResponseEntity<>("User is not asigned to events",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events,HttpStatus.OK);
    }


    @PostMapping("/")
    public ResponseEntity<?> saveEvent(@RequestBody SaveEventDTO info ) {
        Category category = categoryService.findCategoryByCode(info.getCategoryCode());

        if (category == null) {
            return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
        }

        try {
            eventService.save(info, category);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateEvent(@RequestBody UpdateEventDTO info) {
        try {
            boolean updated = eventService.update(info);
            if (updated) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> deleteEvent(@PathVariable(name = "code") String code) {
        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        try {
            boolean deleted = eventService.delete(uuid);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/status/{code}")
    public ResponseEntity<?> changeEventStatus(@PathVariable(name = "code") String code) {
        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        try {
            boolean changed = eventService.changeEventStatus(uuid);
            if (changed) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
