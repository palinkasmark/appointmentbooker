package com.app.appointmentbooker.repository;

import com.app.appointmentbooker.model.BookingDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingDateRepository extends JpaRepository<BookingDate, Integer> {
}
