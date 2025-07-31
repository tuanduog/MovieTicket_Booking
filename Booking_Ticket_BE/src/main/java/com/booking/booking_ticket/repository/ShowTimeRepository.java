package com.booking.booking_ticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.booking_ticket.entity.Show_time;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;


@Repository
public interface ShowTimeRepository extends JpaRepository<Show_time, Integer>{
    @EntityGraph(attributePaths = {"room"})
    List<Show_time> findByMovie_MovieId(Integer movieId);
}
