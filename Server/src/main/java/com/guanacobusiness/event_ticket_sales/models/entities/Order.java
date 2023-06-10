package com.guanacobusiness.event_ticket_sales.models.entities;


import java.util.Date;
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
@Table(name = "order",schema = "public")
public class Order {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_buyer_code", nullable = false)
    private User userBuyer;

    @Column(name = "purchase_date", nullable = false)
    private Date purchaseDate;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Ticket> tickets;

    public Order(User userBuyer, List<Ticket> tickets) {
        super();
        this.userBuyer = userBuyer;
        this.tickets = tickets;
    }

    public Order(User userBuyer, Date purchaseDate) {
        super();
        this.userBuyer = userBuyer;
        this.purchaseDate = purchaseDate;
    }

}
