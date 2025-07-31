package com.booking.booking_ticket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.booking_ticket.dto.ShowTimeDTO;
import com.booking.booking_ticket.entity.Movies;
import com.booking.booking_ticket.entity.Show_time;
import com.booking.booking_ticket.service.ShowTimeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class ShowTimeController {
    @Autowired
    private ShowTimeService showTimeService;

    @GetMapping("/get-showtime/{id}")
        public ResponseEntity<?> getMovie(@PathVariable int id) {
        List<ShowTimeDTO> showTimes = showTimeService.getByMovieId(id);
        return ResponseEntity.ok(showTimes);
    }
}
