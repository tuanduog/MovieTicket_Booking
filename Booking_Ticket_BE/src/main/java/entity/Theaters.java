package entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "theaters")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Theaters {


    @Id
    @Column(name = "theater_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer theaterId;

    @Column(name = "theater_name", nullable = false)
    private String theaterName;

    @Column(name = "room", nullable = false)
    private String theaterRoom;

    @Column(name = "location", nullable = false)
    private String theaterLocation;


    @OneToMany(mappedBy = "theater")
    @ToString.Exclude
    private Set<Booking> bookings;





}
