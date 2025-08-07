package com.booking.booking_ticket.dto.response;

import com.booking.booking_ticket.entity.Movies;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Builder
@Getter
public class ShowtimeResponse {

    private Integer showTimeId;

    private LocalTime startTime;

    private String movieName;

    private Integer movieId;

    private String theaterName;

    private Integer theaterId;

    private String roomName;

    private Integer roomId;
}
