package com.guanacobusiness.event_ticket_sales.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class CurrentTime {
    
    public LocalTime now() {
        LocalTime myTimeObj = LocalTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formatedTime = myTimeObj.format(myFormatObj);
        myTimeObj = LocalTime.parse(formatedTime, myFormatObj);
        return myTimeObj;
    }

}
