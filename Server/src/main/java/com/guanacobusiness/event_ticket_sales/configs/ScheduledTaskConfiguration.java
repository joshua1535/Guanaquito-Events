package com.guanacobusiness.event_ticket_sales.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.guanacobusiness.event_ticket_sales.services.UserService;

@Configuration
@EnableScheduling
public class ScheduledTaskConfiguration {
    
    @Autowired
    private UserService userService;

    @Scheduled(cron = "0 0 1 * * *")
    public void cleanTokens() throws Exception {
        try {
            userService.cleanTokens();
            System.out.println("Tokens cleaned");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
