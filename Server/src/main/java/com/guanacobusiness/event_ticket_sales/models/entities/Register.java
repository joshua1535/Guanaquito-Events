package com.guanacobusiness.event_ticket_sales.models.entities;

import java.time.LocalDateTime;
import java.time.LocalTime;
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
@Table(name = "register")
public class Register {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "transaction_code")
    private String transactionCode;

    @Column(name = "creation_time")
    private LocalTime creationTime;

    @Column(name = "transference_date")
    private LocalDateTime transferenceTime;

    @Column(name = "validation_date")
    private LocalDateTime validationTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_code", nullable = false)
    private Ticket ticket;

    public Register(String transactionCode, LocalTime creation_time, LocalDateTime transferenceTime, LocalDateTime validationTime, Ticket ticket) {
        super();
        this.transactionCode = transactionCode;
        this.creationTime = creation_time;
        this.transferenceTime = transferenceTime;
        this.validationTime = validationTime;
        this.ticket = ticket;
    }

}
