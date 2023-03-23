package com.app.appointmentbooker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.appointmentbooker.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
