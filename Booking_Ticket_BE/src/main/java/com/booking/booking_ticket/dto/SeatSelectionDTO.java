package com.booking.booking_ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatSelectionDTO {
    private String seatCode;
    private Integer showTimeId;
    private String userName;
}
