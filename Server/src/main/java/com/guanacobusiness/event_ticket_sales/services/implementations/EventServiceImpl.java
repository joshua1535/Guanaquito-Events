package com.guanacobusiness.event_ticket_sales.services.implementations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveEventDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateEventDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Category;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.Register;
import com.guanacobusiness.event_ticket_sales.models.entities.EventLocation;
import com.guanacobusiness.event_ticket_sales.repositories.EventLocationRepository;
import com.guanacobusiness.event_ticket_sales.repositories.EventRepository;
import com.guanacobusiness.event_ticket_sales.repositories.RegisterRepository;
import com.guanacobusiness.event_ticket_sales.services.CategoryService;
import com.guanacobusiness.event_ticket_sales.services.EventService;
import com.guanacobusiness.event_ticket_sales.utils.PageDTOMapper;

import jakarta.transaction.Transactional;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PageDTOMapper pageDTOMapper;
    
    @Autowired
    private EventLocationRepository eventLocationRepository;

    @Override
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Page<Event> findAllEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date"));
        return eventRepository.findAll(pageable);
    }

    @Override
    public List<Event> findAllActiveEvents() {
        List<Event> eventList = eventRepository.findAll();
        
        return eventList.stream()
        .filter(event -> event.getActive().equals(true))
        .collect(Collectors.toList());
    }

    @Override
    public Page<Event> findAllActiveEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date"));
        Page<Event> eventList = eventRepository.findByActiveTrue(pageable);
        
        return eventList;
    }

    @Override
    public List<Event> findAllInactiveEvents() {
        List<Event> eventList = eventRepository.findAll();
        
        return eventList.stream()
        .filter(event -> event.getActive().equals(false))
        .collect(Collectors.toList());
    }

    @Override
    public Page<Event> findAllInactiveEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date"));
        Page<Event> eventList = eventRepository.findByActiveFalse(pageable);
        
        return eventList;
    }

    @Override
    public List<Event> findAllCurrentEvents() {
        LocalDate currentDate = LocalDate.now();

        List<Event> eventList = eventRepository.findAll();
        
        return eventList.stream().filter(event -> event.getDate().equals(currentDate) || event.getDate().isAfter(currentDate)).collect(Collectors.toList());
    }

    @Override
    public PageDTO<Event> findAllCurrentEvents(int page, int size) {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        LocalTime currentTimeMinusMinutes = currentTime.minusMinutes(30);
        Pageable pageable = PageRequest.of(page, size, Sort.by("date", "time"));

        Page<Event> events = eventRepository.findByDateEqualsOrDateAfterAndActiveTrue(currentDate,currentDate, pageable);

        if (events.isEmpty() ||events == null) {
            return null;
        }

        List<Event> eventList = events.getContent().stream().filter(event -> (event.getDate().equals(currentDate) && event.getTime().isAfter(currentTimeMinusMinutes))||
        event.getDate().isAfter(currentDate) ).collect(Collectors.toList());

        PageDTO<Event> result = pageDTOMapper.map(eventList,events.getNumber(),eventList.size(),events.getTotalElements(),events.getTotalPages());
        return result;
    }

    @Override
    public List<Event> findAllArchivedEvents() {
        LocalDate currentDate = LocalDate.now();

        List<Event> eventList = eventRepository.findAll();

        return eventList.stream().filter(event -> event.getDate().isBefore(currentDate)).collect(Collectors.toList());
    }

    @Override
    public PageDTO<Event> findAllArchivedEvents(int page, int size) {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        LocalTime currentTimeMinusMinutes = currentTime.minusMinutes(30);
        Pageable pageable = PageRequest.of(page, size, Sort.by("date", "time"));

        Page<Event> events = eventRepository.findByDateEqualsOrDateBefore(currentDate, currentDate, pageable);

        if (events.isEmpty() ||events == null) {
            return null;
        }

        List<Event> eventList = events.getContent().stream().filter(event -> (event.getDate().equals(currentDate) && event.getTime().isBefore(currentTimeMinusMinutes))||
        event.getDate().isBefore(currentDate)).collect(Collectors.toList());

        PageDTO<Event> result = pageDTOMapper.map(eventList,events.getNumber(),eventList.size(),events.getTotalElements(),events.getTotalPages());

        return result;
    }

    @Override
    public PageDTO<Event> findAllByCategory(String code, int page, int size) {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        LocalTime currentTimeMinusMinutes = currentTime.minusMinutes(30);
        Pageable pageable = PageRequest.of(page, size, Sort.by("date", "time"));

        Page<Event> events = eventRepository.findByDateEqualsOrDateAfterAndCategoryCodeAndActiveTrue(currentDate,currentDate,code, pageable);

        if (events.isEmpty() ||events == null) {
            return null;
        }

        List<Event> eventList = events.getContent().stream().filter(event -> (event.getDate().equals(currentDate) && event.getTime().isAfter(currentTimeMinusMinutes))||
        event.getDate().isAfter(currentDate) ).collect(Collectors.toList());

        PageDTO<Event> result = pageDTOMapper.map(eventList,events.getNumber(),eventList.size(),events.getTotalElements(),events.getTotalPages());

        return result;
    }

    @Override
    public Event findEventByCode(UUID code) {
        return eventRepository.findById(code).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Event save(SaveEventDTO info, Category category) throws Exception {
        EventLocation eventLocation = eventLocationRepository.findById(info.getEventLocationCode()).orElse(null);
        if (eventLocation == null) {
            throw new IllegalArgumentException("Event location not found");
        }
        
        System.out.println(info);
        System.out.println(category + " " + category.getCode());

        Event newEvent = new Event();
        newEvent.setTitle(info.getTitle());
        newEvent.setInvolvedPeople(info.getInvolvedPeople());
        newEvent.setImage(info.getImage());
        newEvent.setDate(info.getDate());
        newEvent.setTime(info.getTime());
        newEvent.setDuration(info.getDuration());
        newEvent.setSponsors(info.getSponsors());
        newEvent.setActive(true);
        newEvent.setCategory(category);
        newEvent.setEventLocation(eventLocation);
        newEvent.setWeather(info.getWeather());
        newEvent.setTemperature(info.getTemperature());
        newEvent.setDemo(info.getDemo());

        System.out.println(newEvent);
        System.out.println(newEvent.getCategory());
        System.out.println(newEvent);
        return eventRepository.save(newEvent);   
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Event update(UpdateEventDTO info) throws Exception {
        Event eventFound = eventRepository.findById(UUID.fromString(info.getCode())).orElse(null);

        if (eventFound == null) {
            throw new IllegalArgumentException("Event not found");
        }

        //Event updatedEvent = new Event();

        if (info.getEventLocationCode() != null) {
            EventLocation eventLocation = eventLocationRepository.findById(null).orElse(null);
            if (eventLocation == null) {
                throw new IllegalArgumentException("Event location not found");
            }
            eventFound.setEventLocation(eventLocation);
        }

        if (info.getCategoryCode() != null) {
            Category categoryFound = categoryService.findCategoryByCode(info.getCategoryCode());
            if (categoryFound == null) {
                throw new IllegalArgumentException("Category not found");
            }
            eventFound.setCategory(categoryFound);
        } 

        eventFound.setTitle(info.getTitle() != null ? info.getTitle() : eventFound.getTitle());
        eventFound.setInvolvedPeople(info.getInvolvedPeople() != null ? info.getInvolvedPeople() : eventFound.getInvolvedPeople());
        eventFound.setImage(info.getImage() != null ? info.getImage() : eventFound.getImage());
        eventFound.setDate(info.getDate() != null ? info.getDate() : eventFound.getDate());
        eventFound.setTime(info.getTime() != null ? info.getTime() : eventFound.getTime());
        eventFound.setDuration(info.getDuration() != null ? info.getDuration() : eventFound.getDuration());
        eventFound.setSponsors(info.getSponsors() != null ? info.getSponsors() : eventFound.getSponsors());
        //eventFound.setActive(eventFound.getActive());
        eventFound.setWeather(info.getWeather() != null ? info.getWeather() : eventFound.getWeather());
        eventFound.setTemperature(info.getTemperature() != null ? info.getTemperature() : eventFound.getTemperature());
        eventFound.setDemo(info.getDemo() != null ? info.getDemo() : eventFound.getDemo());

        return eventRepository.save(eventFound);
        //return true;
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

    @Override
    public List<Event> recommendEventsBasedOnAttendance(UUID ownerCode) {
        /*List<Register> registers = registerRepository.findByTicketUserOwnerCodeAndValidationTimeIsNotNull(ownerCode);
        if(registers.isEmpty() || registers == null){
            throw new IllegalArgumentException("No registers found");
        }*/

        //Obtener todas las categorias
        List<Category> categoryList = categoryService.findAllCategories();

        Map<String, Integer>  categoryMap = new HashMap<>();
        Integer totalCount = 0;

        //En cada categoria, verificar cuantos tickets el usuario ha comprado
        for( Category c : categoryList) {
            Integer count = categoryService.countCategoryByUser(c.getCode(), ownerCode);
            categoryMap.put( c.getCode(), count);
            totalCount += count;
        }

        //Obtener la cantidad de eventos a recomendar por categoria
        for( Map.Entry<String, Integer> e : categoryMap.entrySet()) {
            double result = e.getValue() * 5.0 / totalCount;
            categoryMap.put( e.getKey(), (int) Math.round(result));
        }

        List<Event> recommendedEvents = new LinkedList<>();

        //Obtener n eventos de cada categoria y agregarlos a la respuesta
        LocalDate currentDate = LocalDate.now();
        for( Map.Entry<String, Integer> e : categoryMap.entrySet()) {
            if(e.getValue() > 0) {
                Pageable pageable = PageRequest.of(0, e.getValue());

                //Obtener primeros n eventos disponibles de dicha categoria
                List<Event> events = eventRepository.findByDateEqualsOrDateAfterAndActiveTrueAndCategoryCode(currentDate, currentDate, e.getKey(), pageable).getContent();

                recommendedEvents.addAll( events);}
        }

        return recommendedEvents;
    }
    

}
