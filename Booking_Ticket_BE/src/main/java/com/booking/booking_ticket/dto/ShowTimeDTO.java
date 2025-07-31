package com.booking.booking_ticket.dto;

import java.sql.Time;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShowTimeDTO {
    private Integer showTimeId;
    private Time startTime;
    private RoomDTO roomName;
}
