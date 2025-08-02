package com.booking.booking_ticket.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtCookieFilter extends OncePerRequestFilter {

    private final JwtDecoder jwtDecoder;
    private final JwtAuthenticationConverter converter;

    public JwtCookieFilter(JwtDecoder jwtDecoder, JwtAuthenticationConverter converter) {
        this.jwtDecoder = jwtDecoder;
        this.converter = converter;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            Arrays.stream(cookies)
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .findFirst()
                .ifPresent(cookie -> {
                    try {
                        Jwt jwt = jwtDecoder.decode(cookie.getValue());
                        var authentication = converter.convert(jwt);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } catch (Exception e) {
                        SecurityContextHolder.clearContext(); // token sai, hết hạn...
                    }
                });
        }

        filterChain.doFilter(request, response);
    }
}
