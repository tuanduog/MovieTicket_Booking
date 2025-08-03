package com.booking.booking_ticket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.booking.booking_ticket.dto.BookingDTO;
import com.booking.booking_ticket.dto.BookingSimpleDTO;
import com.booking.booking_ticket.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{
    @Query("""
            SELECT new com.booking.booking_ticket.dto.BookingDTO(
                b.bookingId,
                b.chair,
                b.totalPrice,
                b.combo,
                b.date,
                m.image,
                m.movieName,
                s.startTime,
                r.roomName,
                t.theaterName,
                t.theaterLocation
            )
                FROM Booking b
                JOIN b.showTime s
                JOIN s.movie m
                JOIN s.room r
                JOIN r.theater t
                WHERE b.user.userId = :userId
            """)
            List<BookingDTO> findBookingByUserId(@Param("userId") Integer userId);

            List<Booking> findByShowTime_ShowTimeId(Integer showTimeId);

            @Query("SELECT new com.booking.booking_ticket.dto.BookingSimpleDTO(" +
            "b.bookingId, b.chair, b.totalPrice, b.combo, b.date, b.user.userId, b.showTime.showTimeId) " +
            "FROM Booking b WHERE b.showTime.showTimeId = :showTimeId")
            List<BookingSimpleDTO> findBookingSimpleDTOByShowTimeId(@Param("showTimeId") Integer showTimeId);
}

