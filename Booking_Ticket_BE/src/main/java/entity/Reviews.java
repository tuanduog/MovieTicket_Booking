package entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "comments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reviews {

    @Id
    @Column(name = "review_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movies movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "parent_id", nullable = false)
    private String parentId;

    @Column(name = "point", nullable = false)
    private Integer point;

    @Column(name = "created_at", nullable = false)
    private Instant created_at;

    @Column(name = "updated_at", nullable = false)
    private Instant updated_at;







}
