package com.booking.booking_ticket.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "comment_likes")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment_likes {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "comment_id", nullable = false)
    private Integer comment_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "is_like", nullable = false)
    private Integer is_like;

    @Column(name = "created_at", nullable = false)
    private Instant created_at;

}
