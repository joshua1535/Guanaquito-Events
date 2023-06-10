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
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.CreateOrderDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.DateRangeDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.OrderService;
import com.guanacobusiness.event_ticket_sales.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> saveOrder(@Valid @RequestBody CreateOrderDTO info) throws Exception {
        
        UUID uuid = UUID.fromString(info.getUserCode());

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByCode(uuid);

        if(user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        try {
        
            orderService.createOrder(info, user);
            return new ResponseEntity<>("Order saved!",HttpStatus.OK);
        
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/user/{code}")
    public ResponseEntity<?> findAllOrdersByUserBuyerCode(@PathVariable(name = "code") String code) {
    
        UUID uuid = UUID.fromString(code);

        if(uuid == null) {
            return new ResponseEntity<>("Invalid code", HttpStatus.BAD_REQUEST);
        }

        List<Order> orders = orderService.findAllOrdersByUserBuyerCode(uuid);

        if(orders == null) {
            return new ResponseEntity<>("Orders not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(orders, HttpStatus.OK);
    
    }

    @GetMapping("/byDateRange")
    public ResponseEntity<?> findAllOrdersByDateRange(@Valid @RequestBody DateRangeDTO info){
    
        List<Order> orders = orderService.findOrdersBetweenDates(info);
    
        if(orders == null || orders.isEmpty()) {
            return new ResponseEntity<>("Orders not found", HttpStatus.NOT_FOUND);
        }
    
        return new ResponseEntity<>(orders, HttpStatus.OK);
    
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
