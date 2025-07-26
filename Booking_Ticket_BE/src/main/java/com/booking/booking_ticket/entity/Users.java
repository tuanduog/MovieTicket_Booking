package com.booking.booking_ticket.entity;

import com.booking.booking_ticket.utils.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Users {


    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "username", length = 255,nullable = false)
    private String username;

    @Column(name = "password", length = 255,nullable = false)
    private String password;

    @Column(name = "email", length = 255,nullable = false)
    private String email;

    @Column(name = "phone_number", length = 50,nullable = false)
    private String phone;

    @Column(name = "membership", length = 50,nullable = false)
    private String membership;

    @Column(name = "role", length = 50,nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<Cart> setCart = new HashSet();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<Comments> setComments  = new HashSet();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<Comment_likes> setCommentLike = new HashSet();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<Booking> setBookings = new HashSet();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<Reviews> setReviews = new HashSet();



}
