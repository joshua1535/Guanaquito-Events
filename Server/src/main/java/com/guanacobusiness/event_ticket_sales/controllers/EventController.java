package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.AddUserToEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;
import com.guanacobusiness.event_ticket_sales.services.EventService;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.services.UserXEventService;
import com.guanacobusiness.event_ticket_sales.utils.PageDTOMapper;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

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

    @Autowired
    private PageDTOMapper pageDTOMapper;

    @GetMapping("/all")
    public ResponseEntity<?> getAllEvents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
  
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }
  
        Page<Event> events = eventService.findAllEvents(page, size);


        if(events == null || events.isEmpty()){
            return new ResponseEntity<>("No Events Found", HttpStatus.NOT_FOUND);
        }

        PageDTO<Event> response = pageDTOMapper.map(events); 
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    
    @GetMapping("/{code}")
    public ResponseEntity<?> findEventByCode(@PathVariable(name = "code") String code, HttpServletRequest request ) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

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
    public ResponseEntity<?> getAllActiveEvents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        Page<Event> events = eventService.findAllActiveEvents(page, size);

        if (events.isEmpty() || events == null) {
            return new ResponseEntity<>("No Active Events Found",HttpStatus.NOT_FOUND);
        }

        PageDTO<Event> response = pageDTOMapper.map(events);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/inactive")

    public ResponseEntity<?> getAllInactiveEvents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }
        
        Page<Event> events = eventService.findAllInactiveEvents(page, size);

        if (events.isEmpty() || events == null) {
            return new ResponseEntity<>("No Inactive Events Found",HttpStatus.NOT_FOUND);
        }

        PageDTO<Event> response = pageDTOMapper.map(events);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<?> getAllCurrentAndActiveEvents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }  
      
        //Page<Event> events = eventService.findAllCurrentEvents(page, size);
        PageDTO<Event> response = eventService.findAllCurrentEvents(page, size);
        if (response == null) {
            return new ResponseEntity<>("No Current Events found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/archived")
    public ResponseEntity<?> getAllArchivedEvents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }  
      
        PageDTO<Event> response = eventService.findAllArchivedEvents(page, size);

        if (response == null) {
            return new ResponseEntity<>("No Archived Events Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/category/{code}")
    public ResponseEntity<?> findAllEventsByCategory(@PathVariable(name = "code") String code, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, HttpServletRequest request) {
        
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }
      
        Category category = categoryService.findCategoryByCode(code);

        if (category == null) {
            return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
        }

        PageDTO<Event> response = eventService.findAllByCategory(code, page, size);

        if (response == null) {
            return new ResponseEntity<>("No Events Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/user/{code}")
    public ResponseEntity<?> findAllEventsByUser(@PathVariable(name = "code") String code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

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

    @PostMapping("/user")
    public ResponseEntity<?> AddUserToEvent (@Valid @RequestBody AddUserToEventDTO info, HttpServletRequest request) throws Exception{

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }
        System.out.println("Token"+request.getHeader("Authorization").substring(7));

        UUID uuid = UUID.fromString(info.getUserCode());

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByCode(uuid);

        if(user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        UUID eventCode = UUID.fromString(info.getEventCode());

        if(eventCode == null) {
            return new ResponseEntity<>("Invalid event code", HttpStatus.BAD_REQUEST);
        }

        Event event = eventService.findEventByCode(eventCode);

        if(event == null) {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }

        Boolean granted = userXEventService.save(user, event);

        if(!granted) {
            return new ResponseEntity<>("User already added to the event",HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>("User added to the event successfully",HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> revokePermitToUser( @Valid @RequestBody AddUserToEventDTO info, HttpServletRequest request) throws Exception{

        try{
            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = UUID.fromString(info.getUserCode());
        System.out.println("Token"+request.getHeader("Authorization").substring(7));

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByCode(uuid);

        if(user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        UUID permitCode = UUID.fromString(info.getEventCode());

        if(permitCode == null) {
            return new ResponseEntity<>("Invalid Event code", HttpStatus.BAD_REQUEST);
        }

        Event event = eventService.findEventByCode(permitCode);

        if(event == null) {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }

        Boolean revoked = userXEventService.delete(user.getCode(), event.getCode());

        if(!revoked) {
            return new ResponseEntity<>("User already removed from event",HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>("User removed successfully",HttpStatus.OK);
        }
        catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    


    @PostMapping("/")
    public ResponseEntity<?> saveEvent(@Valid @RequestBody SaveEventDTO info, HttpServletRequest request ) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            Category category = categoryService.findCategoryByCode(info.getCategoryCode());

            if (category == null) {
                return new ResponseEntity<>("Category Not Found",HttpStatus.NOT_FOUND);
            }
            System.out.println(info);
            System.out.println(category);
            Event createdEvent = eventService.save(info, category);
           
            return new ResponseEntity<>(createdEvent,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody UpdateEventDTO info, HttpServletRequest request) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            boolean updated = eventService.update(info);
            if (updated) {
                return new ResponseEntity<>("Event updated successfully",HttpStatus.OK);
            }
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/status/{code}")
    public ResponseEntity<?> changeEventStatus(@PathVariable(name = "code") String code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        try {
            boolean changed = eventService.changeEventStatus(uuid);
            if (changed) {
                return new ResponseEntity<>("Event Status Changed",HttpStatus.OK);
            }
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
    MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}