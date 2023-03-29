package com.app.appointmentbooker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.appointmentbooker.model.BookingDetails;

@Repository
public interface BookingDetailsRepository extends JpaRepository<BookingDetails, Integer>{
    @Query(
        value = "SELECT * FROM booking_details" +
        " JOIN product_bookings ON product_bookings.booking_id = booking_details.booking_details_id" +
        " JOIN product ON product.product_id = product_bookings.prod_id" +
        " WHERE product.product_id = :id AND BOOKING_DETAILS.DATE = :date",
        nativeQuery = true
    )
    List<BookingDetails> getBookingDetailsByDate(@Param("id") Integer id, @Param("date") LocalDate date);
    
}
