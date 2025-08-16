package com.booking.booking_ticket.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatSelectionDTO {
    private Integer movieId;
    private String date;
    private Integer showTimeId;
    private Integer userId;
    private List<String> newSeats;
}
