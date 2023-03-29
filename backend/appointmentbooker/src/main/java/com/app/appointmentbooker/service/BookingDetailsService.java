package com.app.appointmentbooker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.BootstrapRegistry;
import org.springframework.stereotype.Service;

import com.app.appointmentbooker.model.BookingDetails;
import com.app.appointmentbooker.repository.BookingDetailsRepository;

@Service
public class BookingDetailsService {

    private final BookingDetailsRepository bookingDetailsRepository;

    @Autowired
    public BookingDetailsService(BookingDetailsRepository bookingDetailsRepository) {
        this.bookingDetailsRepository = bookingDetailsRepository;
    }

    public void saveBooking(BookingDetails bookingDetails) {
        bookingDetailsRepository.save(bookingDetails);
    }

    public List<BookingDetails> getBookingDetailsByDate(Integer id, LocalDate date) {
        return bookingDetailsRepository.getBookingDetailsByDate(id, date);
    }


}
