package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.repositories.EventRepository;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;
import com.guanacobusiness.event_ticket_sales.services.EventService;

import jakarta.transaction.Transactional;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CategoryService categoryService;

    @Override
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<Event> findAllInactiveEvents() {
        List<Event> eventList = eventRepository.findAll();
        
        return eventList.stream()
        .filter(event -> event.getActive().equals(false))
        .collect(Collectors.toList());
    }

    @Override
    public List<Event> findAllArchivedEvents(Date date) {
        return eventRepository.findEventsByEventDateBefore(date);
    }

    @Override
    public Event findEventByCode(UUID code) {
        return eventRepository.findById(code).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void save(SaveEventDTO info, Category category) throws Exception {
        Event newEvent = new Event(
            info.getTitle(),
            info.getInvolvedPeople(),
            info.getImage(),
            info.getDate(),
            info.getTime(),
            info.getDuration(),
            info.getSponsors(),
            true,
            category
        );

        eventRepository.save(newEvent);   
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean update(UpdateEventDTO info) throws Exception {
        Event eventFound = eventRepository.findById(UUID.fromString(info.getCode())).orElse(null);

        if (eventFound == null) {
            return false;
        }

        Event updatedEvent = new Event();

        updatedEvent.setCode(eventFound.getCode());
        updatedEvent.setTitle(info.getTitle() != null ? info.getTitle() : eventFound.getTitle());
        updatedEvent.setInvolvedPeople(info.getInvolvedPeople() != null ? info.getInvolvedPeople() : eventFound.getInvolvedPeople());
        updatedEvent.setImage(info.getImage() != null ? info.getImage() : eventFound.getImage());
        updatedEvent.setDate(info.getDate() != null ? info.getDate() : eventFound.getDate());
        updatedEvent.setTime(info.getTime() != null ? info.getTime() : eventFound.getTime());
        updatedEvent.setDuration(info.getDuration() != null ? info.getDuration() : eventFound.getDuration());
        updatedEvent.setSponsors(info.getSponsors() != null ? info.getSponsors() : eventFound.getSponsors());
        updatedEvent.setActive(eventFound.getActive());


        if (info.getCategoryCode() != null) {
            Category categoryFound = categoryService.findCategoryByCode(info.getCategoryCode());
            if (categoryFound == null) {
                updatedEvent.setCategory(eventFound.getCategory());
            }
            updatedEvent.setCategory(categoryFound);
        } 
        else {updatedEvent.setCategory(eventFound.getCategory());}

        eventRepository.save(updatedEvent);
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean delete(UUID code) throws Exception {
        Event eventFound = eventRepository.findById(code).orElse(null);

        if (eventFound == null) {
            return false;
        }

        eventRepository.deleteById(code);
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean changeEventStatus(UUID code) throws Exception {
        Event eventFound = eventRepository.findById(code).orElse(null);

        if (eventFound == null) {
            return false;
        }

        eventFound.setActive(!eventFound.getActive());
        eventRepository.save(eventFound);
        return true;
    }  
}
