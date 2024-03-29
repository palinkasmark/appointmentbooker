package com.app.appointmentbooker.service;

import com.app.appointmentbooker.model.UserEntity;
import com.app.appointmentbooker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> getUsers() {
        return userRepository.findAll();
    }
/*
    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found."));
    }*/

    public UserEntity getUserByUsername() {
        String username = getUserFromSecContextHolderByUsername();
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found."));
    }

    public List<?> getReservedDatesByUser() {
        String username = getUserFromSecContextHolderByUsername();
        return userRepository.getReservedDatesByUser(username);
    }

    private String getUserFromSecContextHolderByUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
