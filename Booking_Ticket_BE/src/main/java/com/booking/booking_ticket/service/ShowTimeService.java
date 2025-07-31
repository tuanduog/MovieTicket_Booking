package com.booking.booking_ticket.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.booking_ticket.dto.RoomDTO;
import com.booking.booking_ticket.dto.ShowTimeDTO;
import com.booking.booking_ticket.dto.TheaterDTO;
import com.booking.booking_ticket.entity.Rooms;
import com.booking.booking_ticket.entity.Show_time;
import com.booking.booking_ticket.entity.Theaters;
import com.booking.booking_ticket.repository.ShowTimeRepository;

@Service
public class ShowTimeService {
    @Autowired
    private ShowTimeRepository showTimeRepository;

    public List<ShowTimeDTO> getByMovieId(int movieId) {
    List<Show_time> entities = showTimeRepository.findByMovie_MovieId(movieId);

    return entities.stream().map(show -> {
        Rooms room = show.getRoom();
        Theaters theater = room.getTheater(); // ⚠ Nếu lazy, cần gọi đủ để nó load
        
        TheaterDTO theaterDTO = new TheaterDTO(
            theater.getTheaterId(),
            theater.getTheaterName(),
            theater.getTheaterLocation()
        );

        
        RoomDTO roomDTO = new RoomDTO(
            room.getRoomId(),
            room.getRoomName(),
            theaterDTO
        );

        return new ShowTimeDTO(
            show.getShowTimeId(),
            show.getStartTime(),
            roomDTO
        );
    }).toList();
}
}
