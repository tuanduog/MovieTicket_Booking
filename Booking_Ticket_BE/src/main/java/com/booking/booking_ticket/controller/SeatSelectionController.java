package com.booking.booking_ticket.controller;

import com.booking.booking_ticket.dto.SeatSelectionDTO;
import com.booking.booking_ticket.service.SeatRedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.*;

@Controller
public class SeatSelectionController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private SeatRedisService seatRedisService;

    @MessageMapping("/select-seat") // client gửi tới /app/select-seat
    public void selectSeat(@Payload SeatSelectionDTO msg, 
                           @Header("simpSessionId") String sessionId) {

        if (msg == null || msg.getShowTimeId() == null || msg.getDate() == null || msg.getUserId() == null) return;

        Integer showTimeId = msg.getShowTimeId();
        String date = msg.getDate();
        Integer userId = msg.getUserId();

        // Lưu vào redis: lưu theo userId
        Set<String> set = new HashSet<>(msg.getNewSeats() == null ? Collections.emptyList() : msg.getNewSeats());
        seatRedisService.addSeats(showTimeId, date, userId, set);

        // Lấy tổng trạng thái và broadcast cho tất cả client sub vào topic này
        Map<Object, Object> all = seatRedisService.getAll(showTimeId, date);
        // build response object: ví dụ include map userId -> list seats
        Map<String, Object> payload = new HashMap<>();
        payload.put("showTimeId", showTimeId);
        payload.put("date", date);

        Map<String, List<String>> map = new HashMap<>();
        for (Map.Entry<Object, Object> e : all.entrySet()) {
            String uid = e.getKey().toString();
            String csv = e.getValue().toString();
            List<String> seats = csv.isEmpty() ? Collections.emptyList() : Arrays.asList(csv.split(","));
            map.put(uid, seats);
        }
        payload.put("selectedByUsers", map);

        messagingTemplate.convertAndSend("/topic/seats/" + showTimeId + "/" + date, payload);
    }

    @MessageMapping("/unselect-seat")
    public void unselectSeat(@Payload SeatSelectionDTO msg) {
        if (msg == null || msg.getShowTimeId() == null || msg.getDate() == null || msg.getUserId() == null) return;

        seatRedisService.removeUser(msg.getShowTimeId(), msg.getDate(), msg.getUserId());

        Map<Object, Object> all = seatRedisService.getAll(msg.getShowTimeId(), msg.getDate());
        Map<String, Object> payload = new HashMap<>();
        payload.put("showTimeId", msg.getShowTimeId());
        payload.put("date", msg.getDate());

        Map<String, List<String>> map = new HashMap<>();
        for (Map.Entry<Object, Object> e : all.entrySet()) {
            String uid = e.getKey().toString();
            String csv = e.getValue().toString();
            List<String> seats = csv.isEmpty() ? Collections.emptyList() : Arrays.asList(csv.split(","));
            map.put(uid, seats);
        }
        payload.put("selectedByUsers", map);

        messagingTemplate.convertAndSend("/topic/seats/" + msg.getShowTimeId() + "/" + msg.getDate(), payload);
    }
}
