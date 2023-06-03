package com.guanacobusiness.event_ticket_sales.models.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "permit")
public class Permit {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "name")
    private String name;
    
    public Permit(String name) {
        super();
        this.name = name;
    }

}
