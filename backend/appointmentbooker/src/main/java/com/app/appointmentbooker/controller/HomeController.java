package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.model.BookingDetails;
import com.app.appointmentbooker.model.Product;
import com.app.appointmentbooker.model.Shop;
import com.app.appointmentbooker.model.UserEntity;
import com.app.appointmentbooker.service.BookingDetailsService;
import com.app.appointmentbooker.service.ProductService;
import com.app.appointmentbooker.service.ShopService;
import com.app.appointmentbooker.service.UserService;
import com.app.appointmentbooker.utils.RequestWrapper;

import org.hibernate.boot.query.HbmResultSetMappingDescriptor.CollectionResultDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
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


    // @PostMapping("/savebooking")
    // public String saveBooking(
    //     @RequestBody BookingDetails bookingDetails,
    //     @RequestParam(name = "time") LocalTime time
    // ){
    //     // Product product = productService.finProductByName("Vagas");
    //     // BookingDetails bookingDetails = new BookingDetails();
    //     // LocalTime resTime = LocalTime.of(10, 45);

    //     bookingDetails.setDate(time);

    //     Product product = productService.finProductByName(productName);
    //     product.getBookingDetails().add(bookingDetails);
    //     List<LocalTime> newAvailableDates = product.getAvailableDates().stream()
    //             .filter(element -> !element.equals(time))
    //             .collect(Collectors.toList());
    //     product.setAvailableDates(newAvailableDates);
    //     bookingDetailsService.saveBooking(bookingDetails);
    //     return "Success booking";
    // }

    @PostMapping("/savebooking")
    public String saveBooking(
        @RequestBody RequestWrapper requestWrapper,
        Product product
        ){
        // Product product = productService.finProductByName("Vagas");
        // BookingDetails bookingDetails = new BookingDetails();
        // LocalTime resTime = LocalTime.of(10, 45);

        BookingDetails bookingDetails = requestWrapper.getBookingDetails();
        LocalTime time = requestWrapper.getTime();
        bookingDetails.setDate(time);




        // Product selectedProduct = productService.finProductByName();
        product.getBookingDetails().add(bookingDetails);
        List<LocalTime> newAvailableDates = product.getAvailableDates().stream()
                .filter(element -> !element.equals(time))
                .collect(Collectors.toList());
        product.setAvailableDates(newAvailableDates);
        bookingDetailsService.saveBooking(bookingDetails);
        return "Success booking";
    }


    @GetMapping("/getproduct")
    public Product getProductByName(@RequestParam(name = "productName") String productName) {
        System.out.println(productService.finProductByName(productName));
        return productService.finProductByName(productName);
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

   
}
