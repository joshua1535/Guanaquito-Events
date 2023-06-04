package com.guanacobusiness.event_ticket_sales.services.implementations;

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
    public boolean update(UpdateEventDTO info) throws Exception {
        Event eventFound = eventRepository.findById(UUID.fromString(info.getCode())).orElse(null);

        if (eventFound == null) {
            return false;
        }

        Event updatedEvent = new Event();

        updatedEvent.setCode(eventFound.getCode());

        if (info.getTitle() != null) {updatedEvent.setTitle(info.getTitle());} 
        else {updatedEvent.setTitle(eventFound.getTitle());}
        if (info.getInvolvedPeople() != null) {updatedEvent.setInvolvedPeople(info.getInvolvedPeople());} 
        else {updatedEvent.setInvolvedPeople(eventFound.getInvolvedPeople());}
        if (info.getImage() != null) {updatedEvent.setImage(info.getImage());} 
        else {updatedEvent.setImage(eventFound.getImage());}
        if (info.getDate() != null) {updatedEvent.setDate(info.getDate());} 
        else {updatedEvent.setDate(eventFound.getDate());}
        if (info.getTime() != null) {updatedEvent.setTime(info.getTime());} 
        else {updatedEvent.setTime(eventFound.getTime());}
        if (info.getDuration() != null) {updatedEvent.setDuration(info.getDuration());} 
        else {updatedEvent.setDuration(eventFound.getDuration());}
        if (info.getSponsors() != null) {updatedEvent.setSponsors(info.getSponsors());} 
        else {updatedEvent.setSponsors(eventFound.getSponsors());}
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
