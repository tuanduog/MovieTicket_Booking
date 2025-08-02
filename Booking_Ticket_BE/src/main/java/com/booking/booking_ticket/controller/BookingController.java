package com.booking.booking_ticket.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.booking_ticket.dto.BookingDTO;
import com.booking.booking_ticket.entity.Booking;
import com.booking.booking_ticket.repository.BookingRepository;
import com.booking.booking_ticket.service.BookingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
    @Autowired 
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/add-booking")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        try {
            String[] newChairs = booking.getChair().split(",");
            List<Booking> existingBookings = bookingRepository.findByShowTime_ShowTimeId(
                    booking.getShowTime().getShowTimeId());

            for (Booking existing : existingBookings) {
                String[] bookedChairs = existing.getChair().split(",");

                for (String c1 : newChairs) {
                    for (String c2 : bookedChairs) {
                        if (c1.trim().equalsIgnoreCase(c2.trim())) {
                            return ResponseEntity.status(HttpStatus.CONFLICT)
                                    .body("Chair " + c1.trim() + " already booked.");
                        }
                    }
                }
            }

            Booking saved = bookingRepository.save(booking);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save booking: " + e.getMessage());
        }
    }

    @GetMapping("/check-booking")
    public ResponseEntity<?> checkBooking(
            @RequestParam Integer userId,
            @RequestParam Integer showTimeId,
            @RequestParam String chair) {
        try {
            String[] requestedChairs = chair.split(",");

            List<Booking> bookings = bookingRepository.findByShowTime_ShowTimeId(showTimeId);

            for (Booking booking : bookings) {
                String[] bookedChairs = booking.getChair().split(",");

                for (String req : requestedChairs) {
                    for (String booked : bookedChairs) {
                        if (req.trim().equalsIgnoreCase(booked.trim())) {
                            // Nếu tìm thấy ghế bị trùng → trả về true
                            return ResponseEntity.ok(true);
                        }
                    }
                }
            }

            return ResponseEntity.ok(false);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error checking booking: " + e.getMessage());
        }
    }

    

    @GetMapping("/get-userbooking/{userId}")
    public ResponseEntity<?> getUserBooking(@PathVariable Integer userId) {
        try {
            List<BookingDTO> bookings = bookingService.getUserBooking(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to save booking: " + e.getMessage());
        }
    }
}
