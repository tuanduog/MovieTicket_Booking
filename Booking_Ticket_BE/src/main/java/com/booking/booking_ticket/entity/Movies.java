package com.booking.booking_ticket.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "movies")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Movies {

    @Id
    @Column(name = "movie_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;

    @Column(name = "image", nullable = false)
    private String image;
    @Column(name = "movie_name", nullable = false)
    private String movieName;
    @Column(name = "description", nullable = false)
    private String movieDescription;
    @Column(name = "director", nullable = false)
    private String director;
    @Column(name = "cast", nullable = false)
    private String cast;
    @Column(name = "genre", nullable = false)
    private String genre;
    @Column(name = "duration", nullable = false)
    private String duration;
    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @Column(name = "showing", nullable = false)
    private String showing;


    @OneToMany(mappedBy = "movie")
    @ToString.Exclude
    private Set<Ranking> setRank = new HashSet();


    @OneToMany(mappedBy = "movie")
    @ToString.Exclude
    private Set<Cart> setCart = new HashSet();


    @OneToMany(mappedBy = "movie")
    @ToString.Exclude
    private Set<Reviews> setReview = new HashSet();


    @OneToMany(mappedBy = "movie")
    @ToString.Exclude
    private Set<Comments> setComments = new HashSet();


    @OneToMany(mappedBy = "movie")
    @ToString.Exclude
    private Set<Booking> setBooking = new HashSet();










}
