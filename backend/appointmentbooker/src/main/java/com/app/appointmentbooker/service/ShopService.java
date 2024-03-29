package com.app.appointmentbooker.service;

import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.appointmentbooker.model.Shop;
import com.app.appointmentbooker.model.Product;
import com.app.appointmentbooker.repository.ShopRepository;
import org.springframework.stereotype.Service;

@Service
public class ShopService {

    private final ShopRepository shopRepository;


    @Autowired
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public void saveShop(Shop shop) {
        if(!shop.getProducts().isEmpty()) {
            setAppointments(shop);
        }
        shopRepository.save(shop);
    }


    public void setAppointments(Shop shop) {
        Product product = shop.getProducts().get(shop.getProducts().size() - 1);
        LocalTime duration = product.getDuration();
        LocalTime openFrom = shop.getOpenFrom();
        LocalTime openTo = shop.getOpenTo();

        LocalTime newAppointment = openFrom;
        System.out.println(openFrom);
        
        while(newAppointment.getHour() < openTo.getHour()) {
            product.getAvailableDates().add(newAppointment);
            LocalTime lastAppointment = product.getAvailableDates().get(product.getAvailableDates().size() - 1);
            newAppointment = lastAppointment.plusHours(duration.getHour()).plusMinutes(duration.getMinute());
        }
    }

    public List<Shop> getShops() {
        return shopRepository.findAll();
    }

    public Shop getShopById(Integer id) {
        return shopRepository.findById(id).get();
    }

  

    
}
