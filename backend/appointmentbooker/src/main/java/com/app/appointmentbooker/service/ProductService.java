package com.app.appointmentbooker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.appointmentbooker.model.Product;
import com.app.appointmentbooker.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;


    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }




    public void saveProduct(Product product) {
        productRepository.save(product);
    }


    // private void setAppointments(Shop shop) {
    //     Product product = shop.getProducts().get(shop.getProducts().size() - 1);
    //     LocalTime duration = product.getDuration();
    //     LocalTime openFrom = shop.getOpenFrom();
    //     LocalTime openTo = shop.getOpenTo();

    //     LocalTime newAppointment = openFrom; 
        
    //     while(newAppointment.getHour() < openTo.getHour()) {
    //         product.getAvailableDates().add(newAppointment);
    //         LocalTime lastAppointment = product.getAvailableDates().get(product.getAvailableDates().size() - 1);
    //         newAppointment = lastAppointment.plusHours(duration.getHour()).plusMinutes(duration.getMinute());
    //     }
    // }
    
}
