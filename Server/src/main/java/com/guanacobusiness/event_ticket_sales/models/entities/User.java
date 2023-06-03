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
import jakarta.persistence.Lob;
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
    @Lob
    private byte[] profilePicture;

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

    public User(String email, String password, byte[] profilePicture) {
        super();
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    public User(String email, String password, byte[] profilePicture, List<UserXPermit> userXPermit) {
        super();
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.userXPermit = userXPermit;
    }

    public User(UUID code2, String email2, String newPassword, byte[] profilePicture2) {
        super();
        this.code = code2;
        this.email = email2;
        this.password = newPassword;
        this.profilePicture = profilePicture2;
    }

}
