package com.guanacobusiness.event_ticket_sales.models.entities;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@Entity
@ToString(exclude = "userXPermits")
@Table(name = "permit")
public class Permit {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "name")
    private String name;
    
    @OneToMany(mappedBy = "permit", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserXPermit> userXPermits;

    public Permit(String name) {
        super();
        this.name = name;
    }

    public Permit(String name, List<UserXPermit> userXPermits) {
        super();
        this.name = name;
        this.userXPermits = userXPermits;
    }

}
