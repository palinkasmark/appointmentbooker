package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.model.BookingDetails;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

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

    @GetMapping("/getdates")
    public List<?> getReservedDatesByUser() {
        return userService.getReservedDatesByUser();
    }


    @PostMapping("/saveshop")
    public String saveShop(@RequestBody Shop shop) {
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

    @PostMapping("/savebooking")
    public String saveBooking(  
        @RequestBody BookingDetails bookingDetails,
        @RequestParam Integer id
    ){
        Product product = productService.findProductById(id).get();
        product.getBookingDetails().add(bookingDetails);

        List<LocalTime> newAvailableDates = product.getAvailableDates().stream()
                .filter(element -> !element.equals(bookingDetails.getTime()))
                .collect(Collectors.toList());
        product.setAvailableDates(newAvailableDates);
        bookingDetailsService.saveBooking(bookingDetails);
        return "Success booking";
    }


    @GetMapping("/getproductby")
    public Optional<Product> getProductById(@RequestParam(name = "id") Integer id) {
        System.out.println(productService.findProductById(id));
        return productService.findProductById(id);
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

   
}
