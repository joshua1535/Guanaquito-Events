package com.guanacobusiness.event_ticket_sales.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class CurrentDateTime {

    public LocalDateTime now() {
        LocalDateTime myDateTimeObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = myDateTimeObj.format(myFormatObj);
        myDateTimeObj = LocalDateTime.parse(formattedDate, myFormatObj);
        return myDateTimeObj;
    }
}
