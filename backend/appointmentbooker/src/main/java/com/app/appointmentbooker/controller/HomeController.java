package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.model.Product;
import com.app.appointmentbooker.model.Shop;
import com.app.appointmentbooker.model.UserEntity;
import com.app.appointmentbooker.service.BookingDetailsService;
import com.app.appointmentbooker.service.ProductService;
import com.app.appointmentbooker.service.ShopService;
import com.app.appointmentbooker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class HomeController {

    private final UserService userService;
    private final BookingDetailsService bookingDetailsService;
    private final ShopService shopService;
    private final ProductService productService;

    @Autowired
    public HomeController(UserService userService, BookingDetailsService bookingDetailsService, ShopService shopService, ProductService productService) {
        this.userService = userService;
        this.bookingDetailsService = bookingDetailsService;
        this.shopService = shopService;
        this.productService = productService;
    }


    @GetMapping("/home")
    public List<UserEntity> home() {
        return userService.getUsers();
    }

    // @PostMapping("/savebooking")
    // public String saveBooking(@RequestBody BookingDetails date) {
    //     // String username = SecurityContextHolder.getContext().getAuthentication().getName();
    //     // UserEntity user = userService.getUserByUsername(username);
    //     UserEntity user = userService.getUserByUsername();
    //     user.getBookings().add(date);
    //     user.setBookings(user.getBookings());

    //     bookingDetailsService.saveBooking(date);
    //     return "Succes";
    // }



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

    @PostMapping("/saveproduct") 
    public String saveProductToShop(@RequestBody Product product) {
        UserEntity user = userService.getUserByUsername();
        Shop shop = user.getShop();
        shop.getProducts().add(product);
        shopService.setAppointments(shop);
        productService.saveProduct(product);
        return "Success";
    }
    

    
}
