package com.booking.booking_ticket.controller;


import com.booking.booking_ticket.dto.response.*;
import com.booking.booking_ticket.service.Impl.BookingServiceImpl;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/booking")
public class BookingController  {

    public final BookingServiceImpl bookingService;

    @GetMapping("/get-data-for-line-chart")
    public ResponseData<LineChartDTOResponse> getProductMultipleSearchCol() {
        LineChartDTOResponse l_c = LineChartDTOResponse.builder()
                .a_cus(bookingService.getCustomersThisyear())
                .revenue(bookingService.getRevenueThisYear())
                .build();
        try{
            return new ResponseData<>(HttpStatus.OK.value(),"User found!",l_c);
        }
        catch (Exception e)
        {
            log.error("there is an error : {}",e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getBookingStats(@RequestParam int year) {
        Map<String, List<Number>> chartData = bookingService.getMonthlyChartData(year);
        return ResponseEntity.ok(chartData);
    }
    @GetMapping("/bookings-by-category")
    public ResponseEntity<List<Map<String, Object>>> getBookingStatsByCategory() {
        List<BookingByCategoryStats> stats = bookingService.getBookingStatsByCategory();

        // Convert sang format ECharts pie: [{name, value}]
        List<Map<String, Object>> result = stats.stream().map(stat -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", stat.getCategory());
            map.put("value", stat.getTotal());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
    @GetMapping("/responses")
    public ResponseEntity<List<BookingResponse>> getAllBookingResponses() {
        return ResponseEntity.ok(bookingService.getAllBookingResponses());
    }
}
