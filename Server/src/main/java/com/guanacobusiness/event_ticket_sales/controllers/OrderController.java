package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.CreateOrderDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.FormatedOrderDTO;
import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;
import com.guanacobusiness.event_ticket_sales.models.entities.Order;
import com.guanacobusiness.event_ticket_sales.models.entities.User;
import com.guanacobusiness.event_ticket_sales.services.OrderService;
import com.guanacobusiness.event_ticket_sales.services.UserService;
import com.guanacobusiness.event_ticket_sales.utils.JWTTools;
import com.guanacobusiness.event_ticket_sales.utils.OrderMapper;
import com.guanacobusiness.event_ticket_sales.utils.PageDTOMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @Autowired
    JWTTools jwtUtil;

    @Autowired
    OrderMapper orderMapper;

    @Autowired
    PageDTOMapper pageDTOMapper;

    @PostMapping("/")
    public ResponseEntity<?> saveOrder(@Valid @RequestBody CreateOrderDTO info, HttpServletRequest request) throws Exception {
        
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        String jwt = request.getHeader("Authorization").substring(7);
        String userEmail = jwtUtil.getUsernameFrom(jwt);

        User user = userService.findByEmail(userEmail);

        if(user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        try {
        
            Order createdOrder = orderService.createOrder(info, user);
            return new ResponseEntity<>(createdOrder.getCode().toString(),HttpStatus.OK);
        
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/user-orders")
    public ResponseEntity<?> findAllOrdersByUserBuyer(HttpServletRequest request, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10")int size ) {
    
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        String jwt = request.getHeader("Authorization").substring(7);
        String userEmail = jwtUtil.getUsernameFrom(jwt);

        User user = userService.findByEmail(userEmail);

        Page<Order> orders = orderService.findAllOrdersByUserBuyerCode(user.getCode(), page, size);

        if(orders == null) {
            return new ResponseEntity<>("Orders not found", HttpStatus.NOT_FOUND);
        }

        List<FormatedOrderDTO> formatedOrders = orderMapper.map(orders.getContent());
        PageDTO<FormatedOrderDTO> response = pageDTOMapper.map(formatedOrders, orders);

        return new ResponseEntity<>(response, HttpStatus.OK);
    
    }   

    /* @GetMapping("/date-range")
    public ResponseEntity<?> findAllOrdersByDateRange(HttpServletRequest request,@Valid @RequestBody DateRangeDTO info,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10")int size){
    
        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<Order> orders = orderService.findOrdersBetweenDates(info);
    
        if(orders == null || orders.isEmpty()) {
            return new ResponseEntity<>("Orders not found", HttpStatus.NOT_FOUND);
        }
    
        return new ResponseEntity<>(orders, HttpStatus.OK);
    
    } */

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
