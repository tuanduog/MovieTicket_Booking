package com.booking.booking_ticket.controller;

import com.booking.booking_ticket.dto.SeatSelectionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class SeatSelectionController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/selectSeat/{showTimeId}")
    public void selectSeat(@DestinationVariable Integer showTimeId, SeatSelectionDTO selection) {
        // check theo showTimeId
        messagingTemplate.convertAndSend("/topic/seats/" + showTimeId, selection);
    }
}
