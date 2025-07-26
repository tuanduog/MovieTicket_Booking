package com.booking.booking_ticket.controller;


import com.booking.booking_ticket.dto.response.IntrospectiveResponse;
import com.booking.booking_ticket.dto.response.ResponseData;
import com.booking.booking_ticket.dto.response.ResponseError;
import com.booking.booking_ticket.entity.Movies;
import com.booking.booking_ticket.service.Impl.MoviesServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/movies")
public class MoviesController {

    private final MoviesServiceImpl moviesService;


    @GetMapping("/getGenres")
    public ResponseData<?> getGenres()
    {
        try{
            List<String> result = moviesService.getGenres();
            System.out.println(result.size());
            if(!result.isEmpty())
                return new ResponseData<>(HttpStatus.OK.value(),"Có genre",result);
            else
                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "genre null");
        }
        catch (Exception e)
        {
            log.error("there is an error of introspect: {}",e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }


    }
    @GetMapping("/getAll")
    public ResponseData<?> getMovies()
    {
        try{
            List<Movies> result = moviesService.getAllMovies();
            System.out.println(result.size());
            if(!result.isEmpty())
                return new ResponseData<>(HttpStatus.OK.value(),"Có movies",result);
            else
                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "movies null");
        }
        catch (Exception e)
        {
            log.error("there is an error of introspect: {}",e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }


    }
    @GetMapping("/get-products-multiple-searching-col")
    public ResponseData<?> getProductMultipleSearchCol( @RequestParam(defaultValue = "0") int pageNo,
                                                        @Min(10)@RequestParam(defaultValue = "10") int pageSize,
                                                        @RequestParam(required = false) String sortBy,
                                                        @RequestParam(required = false) String... search) {
        try{
            return new ResponseData<>(HttpStatus.OK.value(),"User found!",moviesService.getProductsWithMultipleSearchingColumns(pageNo,pageSize,sortBy,search));
        }
        catch (Exception e)
        {
            log.error("there is an error : {}",e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }
}
