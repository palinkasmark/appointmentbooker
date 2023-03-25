package com.app.appointmentbooker.model;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private LocalTime duration;
    private List<LocalTime> availableDates = new ArrayList<>();
    // private List<LocalTime> reservedDates = new ArrayList<>();

    private int price;

    @OneToMany
    @JoinTable(name = "product_bookings",
                joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
                inverseJoinColumns = @JoinColumn(name = "booking_id", referencedColumnName = "id"))
    private List<BookingDetails> bookingDetails = new ArrayList<>();

    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", duration=" + duration + ", availableDates=" + availableDates
                + ", price=" + price + ", bookingDetails=" + bookingDetails + "]";
    }


    
}
