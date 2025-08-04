package com.booking.booking_ticket.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.booking_ticket.entity.Users;
import com.booking.booking_ticket.repository.UsersRepository;

@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepository;

    public Users getByUsername (String userName){
        Optional<Users> users = usersRepository.findByUsername(userName);
        if(users.isPresent()){
            return users.get();
        }
        return null;
    }
}
