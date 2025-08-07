package com.booking.booking_ticket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.booking_ticket.dto.BookingSimpleDTO;
import com.booking.booking_ticket.dto.MembershipDTO;
import com.booking.booking_ticket.dto.request.MembershipRequest;
import com.booking.booking_ticket.entity.Users;
import com.booking.booking_ticket.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get-Userprofile/{userName}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String userName) {
        try {
            Users user = userService.getByUsername(userName);
            return ResponseEntity.ok(user);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to getbooking byshowtime: " + e.getMessage());
        }
    }
    
    @PutMapping("/update-Userprofile")
    public ResponseEntity<?> updateUserprofile(@RequestBody Users user) {
        try {
            Users users = userService.updateProfile(user);
            return ResponseEntity.ok(users);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to getbooking byshowtime: " + e.getMessage());
        }
    }

    @PutMapping("/update-Membership/{userId}")
    public ResponseEntity<?> updateMembership(@PathVariable Integer userId, @RequestBody MembershipRequest membership) {
        try {
            Users user = userService.updateMembership(userId, membership);
            return ResponseEntity.ok(user);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to getbooking byshowtime: " + e.getMessage());
        }
    }

    @GetMapping("/get-Membership/{userId}")
    public ResponseEntity<?> getMembership(@PathVariable Integer userId) {
        try {
            MembershipDTO mem = userService.getUserMembership(userId);
            return ResponseEntity.ok(mem);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to getuser membership: " + e.getMessage());
        }
    }
    
}
