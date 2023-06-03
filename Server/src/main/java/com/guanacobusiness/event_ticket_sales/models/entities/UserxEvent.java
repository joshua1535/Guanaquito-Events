package com.guanacobusiness.event_ticket_sales.models.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "userxevent")
public class UserxEvent {
    
    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private UUID code;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_code", nullable = false)
    private Event event;

    public UserxEvent(Event event) {
        super();
        this.event = event;
    }

}
