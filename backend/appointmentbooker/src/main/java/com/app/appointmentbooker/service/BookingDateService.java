package com.app.appointmentbooker.service;

import com.app.appointmentbooker.model.BookingDate;
import com.app.appointmentbooker.repository.BookingDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingDateService {

    private final BookingDateRepository bookingDateRepository;

    @Autowired
    public BookingDateService(BookingDateRepository bookingDateRepository) {
        this.bookingDateRepository = bookingDateRepository;
    }

    public void saveBooking(BookingDate bookingDate) {
        bookingDateRepository.save(bookingDate);
    }



}
