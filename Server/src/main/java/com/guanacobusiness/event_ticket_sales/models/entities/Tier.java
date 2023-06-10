package com.guanacobusiness.event_ticket_sales.models.entities;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@Entity
@ToString(exclude = {"tickets"})
@Table(name = "tier")
public class Tier {
    
    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "tier_name")
    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "capacity")
    private Integer capacity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_code", nullable = false)
    private Event event;

    @OneToMany(mappedBy = "tier", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> tickets;
    
    public Tier(String name, BigDecimal price, Integer capacity, Event event) {
        super();
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.event = event;
    }

    public Tier(String name, BigDecimal price, Integer capacity, Event event, List<Ticket> tickets) {
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.event = event;
        this.tickets = tickets;
    }

}
