package com.guanacobusiness.event_ticket_sales.utils;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class StringToUUID {
    public UUID convert(String uuid) {
        try {
            return UUID.fromString(uuid);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
