package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.guanacobusiness.event_ticket_sales.models.dtos.EventAndTiersInfoDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.SaveTierDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.UpdateTierDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Event;
import com.guanacobusiness.event_ticket_sales.models.entities.Tier;
import com.guanacobusiness.event_ticket_sales.services.EventService;
import com.guanacobusiness.event_ticket_sales.services.TierService;
import com.guanacobusiness.event_ticket_sales.utils.StringToUUID;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/tier")
@CrossOrigin(origins = "*")
public class TierController {

    @Autowired
    private TierService tierService;

    @Autowired
    private StringToUUID stringToUUID;

    @Autowired
    private EventService eventService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTiers(HttpServletRequest request,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<Tier> tiers = tierService.findAllTiers();

        if(tiers == null || tiers.isEmpty()){
            return new ResponseEntity<>("No Tiers Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tiers,HttpStatus.OK);
    }

    @GetMapping("/event/{code}")
    public ResponseEntity<?> getAllTiersByEventCode(@PathVariable(name = "code") String code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = stringToUUID.convert(code);

        if(uuid == null){
            return new ResponseEntity<>("Invalid Code", HttpStatus.BAD_REQUEST);
        }

        Event event = eventService.findEventByCode(uuid);

        if(event == null){
            return new ResponseEntity<>("Event Not Found", HttpStatus.NOT_FOUND);
        }

        EventAndTiersInfoDTO info = tierService.findAllTiersByEvent(event);

        if(info == null){
            return new ResponseEntity<>("No Tiers Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(info,HttpStatus.OK);
    }
    
    @GetMapping("/{code}")
    public ResponseEntity<?> findTierByCode(@PathVariable(name = "code") String code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        Tier tier = tierService.findTierByCode(uuid);

        if (tier == null) {
            return new ResponseEntity<>("Tier Not Found",HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tier,HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> saveTier(HttpServletRequest request, @Valid @RequestBody SaveTierDTO info ) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = stringToUUID.convert(info.getEventCode());

        if(uuid == null){
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        Event event = eventService.findEventByCode(uuid);

        if(event == null){
            return new ResponseEntity<>("Event Not Found",HttpStatus.NOT_FOUND);
        }

        try {
            tierService.save(info,event);
            return new ResponseEntity<>("Tier Saved",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateTier(@Valid @RequestBody UpdateTierDTO info, HttpServletRequest request) {
        try {

            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }

            Boolean statusUpdate = tierService.update(info);

            if(!statusUpdate){
                return new ResponseEntity<>("Tier Not Found",HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("Tier Updated",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> deleteTier(@PathVariable(name = "code") String code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        UUID uuid = stringToUUID.convert(code);

        if (uuid == null) {
            return new ResponseEntity<>("Invalid Code",HttpStatus.BAD_REQUEST);
        }

        try {
            Boolean statusDelete = tierService.delete(uuid);

            if(!statusDelete){
                return new ResponseEntity<>("Tier Not Found",HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("Tier Deleted",HttpStatus.OK);
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
