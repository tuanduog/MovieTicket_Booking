package com.booking.booking_ticket.service;

import com.booking.booking_ticket.entity.Theaters;

import java.util.List;

public interface TheatersService {
    List<String> getLocations();

    List<Theaters> getTheatersByLocation(String location);

}