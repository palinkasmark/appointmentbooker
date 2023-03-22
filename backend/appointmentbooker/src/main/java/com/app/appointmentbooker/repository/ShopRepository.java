package com.app.appointmentbooker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.appointmentbooker.model.Shop;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer>{}