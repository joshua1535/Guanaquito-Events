package com.guanacobusiness.event_ticket_sales.models.entities;

import java.math.BigDecimal;
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
@Table(name = "tier")
public class Tier {
    
    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "capacity")
    private Integer capacity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_code", nullable = false)
    private Event event;

    /* @OneToMany(mappedBy = "tier", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> tickets; */
    
    public Tier(String name, BigDecimal price, Integer capacity, Event event) {
        super();
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.event = event;
    }

}
