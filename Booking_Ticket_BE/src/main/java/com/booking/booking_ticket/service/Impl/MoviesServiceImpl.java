package com.booking.booking_ticket.service.Impl;

import com.booking.booking_ticket.dto.response.PageResponse;
import com.booking.booking_ticket.entity.Movies;
import com.booking.booking_ticket.repository.MoviesRepository;
import com.booking.booking_ticket.repository.SearchRepository;
import com.booking.booking_ticket.service.MoviesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MoviesServiceImpl implements MoviesService {

    private final MoviesRepository moviesRepository;
    private final SearchRepository searchRepository;

    @Override
    public List<String> getGenres() {
        List<String> genres = moviesRepository.collectGenre().stream().toList();

        return genres;
    }

    @Override
    public List<Movies> getAllMovies() {
        return moviesRepository.findAll();
    }

    @Override
    public PageResponse<?> getProductsWithMultipleSearchingColumns(int pageNo, int pageSize, String sortBy, String... search) {
        return searchRepository.searchingProductWithMultipleColumns(pageNo,pageSize,sortBy,search) ;
    }


}
