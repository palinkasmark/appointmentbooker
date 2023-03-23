package com.app.appointmentbooker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.appointmentbooker.model.BookingDetails;

@Repository
public interface BookingDetailsRepository extends JpaRepository<BookingDetails, Integer>{
    
}
