package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.model.BookingDate;
import com.app.appointmentbooker.model.Shop;
import com.app.appointmentbooker.model.UserEntity;
import com.app.appointmentbooker.service.BookingDateService;
import com.app.appointmentbooker.service.ShopService;
import com.app.appointmentbooker.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class HomeController {

    private final UserService userService;
    private final BookingDateService bookingDateService;
    private final ShopService shopService;

    @Autowired
    public HomeController(UserService userService, BookingDateService bookingDateService, ShopService shopService) {
        this.userService = userService;
        this.bookingDateService = bookingDateService;
        this.shopService = shopService;
    }


    @GetMapping("/home")
    public List<UserEntity> home() {
        return userService.getUsers();
    }

    @PostMapping("/savebooking")
    public String saveBooking(@RequestBody BookingDate date) {
        // String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // UserEntity user = userService.getUserByUsername(username);
        UserEntity user = userService.getUserByUsername();
        user.getBookings().add(date);
        user.setBookings(user.getBookings());

        bookingDateService.saveBooking(date);
        return "Succes";
    }



    @GetMapping("/getdates")
    public List<?> getReservedDatesByUser() {
        // String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // return userService.getReservedDatesByUser(username);
        return userService.getReservedDatesByUser();
    }


    @PostMapping("/saveshop")
    public String saveShop(@RequestBody Shop shop) {
        // String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // UserEntity user = userService.getUserByUsername(username);
        UserEntity user = userService.getUserByUsername();
        user.setShop(shop);

        shopService.saveShop(shop);
        
        return "Success";
    }

    
}
