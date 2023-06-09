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
@Table(name = "register")
public class Register {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "transaction_code")
    private String transactionCode;

    @Column(name = "transference_time")
    private String transferenceTime;

    @Column(name = "validation_time")
    private String validationTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_code", nullable = false)
    private Ticket ticket;

    public Register(String transactionCode, String transferenceTime, String validationTime, Ticket ticket) {
        super();
        this.transactionCode = transactionCode;
        this.transferenceTime = transferenceTime;
        this.validationTime = validationTime;
        this.ticket = ticket;
    }

}
