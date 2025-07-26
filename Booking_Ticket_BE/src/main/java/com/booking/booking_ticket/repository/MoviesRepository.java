package com.booking.booking_ticket.repository;

import com.booking.booking_ticket.entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MoviesRepository extends JpaRepository<Movies, Integer> {

    @Query("Select distinct m.genre from Movies m")
    List<String> collectGenre();

}
