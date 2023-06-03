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
@Table(name = "ticket")
public class Ticket {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_code", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tier_code", nullable = false)
    private Tier tier;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_owner_code", nullable = false)
    private User userOwner;

    public Ticket(Order order, Tier tier, User userOwner) {
        this.order = order;
        this.tier = tier;
        this.userOwner = userOwner;
    }

}
