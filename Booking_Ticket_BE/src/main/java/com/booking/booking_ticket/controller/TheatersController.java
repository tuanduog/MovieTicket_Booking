package com.booking.booking_ticket.controller;

import com.booking.booking_ticket.dto.response.ResponseData;
import com.booking.booking_ticket.dto.response.ResponseError;
import com.booking.booking_ticket.entity.Theaters;
import com.booking.booking_ticket.service.Impl.TheatersServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/theaters")
public class TheatersController {

    private final TheatersServiceImpl theatersService;

    @GetMapping("/getLocations")
    public ResponseData<?> getGenres()
    {
        try{
            List<String> result = theatersService.getLocations();
            System.out.println(result.size());
            if(!result.isEmpty())
                return new ResponseData<>(HttpStatus.OK.value(),"Có location",result);
            else
                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "location null");
        }
        catch (Exception e)
        {
            log.error("there is an error of introspect: {}",e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }


    }
    @GetMapping("/getTheaterByLocation")
    public ResponseData<?> getGenres(@RequestParam String Location)
    {
        try{
            List<Theaters> result = theatersService.getTheatersByLocation(Location);
            System.out.println(result.size());
            if(!result.isEmpty())
                return new ResponseData<>(HttpStatus.OK.value(),"Có theater",result);
            else
                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "theater null");
        }
        catch (Exception e)
        {
            log.error("there is an error of introspect: {}",e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }


    }

}
