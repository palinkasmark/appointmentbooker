package com.app.appointmentbooker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.appointmentbooker.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(
        value = "select * from product where name = :name", 
        nativeQuery = true)
    Product findByName(@Param("name") String name);
}
