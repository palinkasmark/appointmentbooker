package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.model.UserEntity;
import com.app.appointmentbooker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    private final UserService userService;

    @Autowired
    public HomeController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/home")
    public List<UserEntity> home() {
        return userService.getUsers();
    }
}
