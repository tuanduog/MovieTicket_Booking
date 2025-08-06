package com.booking.booking_ticket.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembershipDTO {
    private Integer userId;
    private String membership;
    private LocalDateTime startDate;
    private Integer expired;
}
