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
@Table(name = "event")
@ToString(exclude = {"userXEvents", "tiers"})
public class Event {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private UUID code;

    @Column(name = "event_title")
    private String title;

    @Column(name = "invloved_people")
    private String involvedPeople;

    @Column(name = "event_image")
    private String image;

    @Column(name = "event_date")
    private Date date;

    @Column(name = "event_time")
    private java.sql.Time time;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "sponsors")
    private String sponsors;

    @Column(name = "active")
    private Boolean active;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserXEvent> userXEvents;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Tier> tiers;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_code")
    private Category category;

    public Event(String title, String involvedPeople, String image, Date date, java.sql.Time time, Integer duration,
            String sponsors, Boolean active, Category category) {
        super();
        this.title = title;
        this.involvedPeople = involvedPeople;
        this.image = image;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.sponsors = sponsors;
        this.active = active;
        this.category = category;
    }

}
