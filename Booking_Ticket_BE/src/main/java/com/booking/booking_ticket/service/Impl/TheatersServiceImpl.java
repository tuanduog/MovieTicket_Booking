package com.booking.booking_ticket.service.Impl;

import com.booking.booking_ticket.dto.request.MovieRequestDTO;
import com.booking.booking_ticket.dto.request.ThearterRequestDTO;
import com.booking.booking_ticket.entity.Theaters;
import com.booking.booking_ticket.repository.TheaterRepository;
import com.booking.booking_ticket.service.TheatersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TheatersServiceImpl implements TheatersService {

    public final TheaterRepository theaterRepository;

    @Override
    public List<String> getLocations() {
        return theaterRepository.getLocations();
    }

    @Override
    public List<Theaters> getTheatersByLocation(String location) {
        return theaterRepository.getTheatersByTheaterLocation(location);
    }

    @Override
    public List<Theaters> getAllTheater() {
        return theaterRepository.findAll();
    }

    @Override
    public int addTheater(ThearterRequestDTO movieRequestDTO) {




        return 0;
    }

    @Override
    public int editTheater(int id, ThearterRequestDTO movieRequestDTO) {
        return 0;
    }

    @Override
    public int deleteTheater(int id) {
        return 0;
    }


}