package com.booking.booking_ticket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.booking_ticket.entity.Movies;
import com.booking.booking_ticket.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @GetMapping("/getAll-movies")
    public ResponseEntity<?> getAllMovies() {
        List<Movies> mv = movieService.getAllMovies();
        return ResponseEntity.ok(mv);
    }
    
    @GetMapping("/get-movie/{id}")
    public ResponseEntity<?> getMovie(@PathVariable int id) {
        Movies mv = movieService.getMovieById(id);
        return ResponseEntity.ok(mv);
    }
    
}
