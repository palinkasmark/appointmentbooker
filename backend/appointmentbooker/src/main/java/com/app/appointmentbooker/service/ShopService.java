package com.app.appointmentbooker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.appointmentbooker.model.Shop;
import com.app.appointmentbooker.repository.ShopRepository;

@Service
public class ShopService {

    private final ShopRepository shopRepository;


    @Autowired
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public void saveShop(Shop shop) {
        shopRepository.save(shop);
    }

    
}
