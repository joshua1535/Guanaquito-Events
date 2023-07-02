package com.guanacobusiness.event_ticket_sales.models.entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
@ToString(exclude = {"userXPermits", "orders", "tickets", "userXEvents", "tokens"})
@Table(name = "user", schema = "public")
public class User implements UserDetails{
    
    private static final long serialVersionUID = 1460435087476558985L;

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

    @Column(name = "active", insertable = false)
    private Boolean active;

    @Column(name = "date_added",insertable = false, updatable = false)
    private LocalDateTime dateAdded;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserXPermit> userXPermits;

    @OneToMany(mappedBy = "userBuyer", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Order> orders;

    @OneToMany(mappedBy = "userOwner", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Ticket> tickets;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserXEvent> userXEvents;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Token> tokens;

    public User(String email, String password, String profilePicture) {
        super();
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    public User(String email, String password, String profilePicture, List<UserXPermit> userXPermits) {
        super();
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.userXPermits = userXPermits;
    }

    public User(UUID code2, String email2, String newPassword, String profilePicture2) {
        super();
        this.code = code2;
        this.email = email2;
        this.password = newPassword;
        this.profilePicture = profilePicture2;
    }

    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return this.active;
	}

    @Override
    public String getUsername() {
        return email;
    }

}
