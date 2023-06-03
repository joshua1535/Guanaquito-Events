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
@ToString(exclude = {"userXPermit", "order", "ticket", "userxEvent"})
@Table(name = "user", schema = "public")
public class User {
    
    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID code;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name="profile_picture")
    private String profilePicture;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserXPermit> userXPermit;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Order> order;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Ticket> ticket;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserxEvent> userxEvent;

    public User(String email, String password, String profilePicture) {
        super();
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    public User(String email, String password, String profilePicture, List<UserXPermit> userXPermit) {
        super();
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.userXPermit = userXPermit;
    }

}
