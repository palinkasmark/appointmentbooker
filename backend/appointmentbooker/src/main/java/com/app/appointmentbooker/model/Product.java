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
    @Column(name = "product_id")
    private int id;
    private String productName;
    private LocalTime duration;
    private List<LocalTime> availableDates = new ArrayList<>();
    
    private int price;

    @OneToMany
    @JoinTable(name = "product_bookings",
                joinColumns = @JoinColumn(name = "prod_id", referencedColumnName = "product_id"),
                inverseJoinColumns = @JoinColumn(name = "booking_id", referencedColumnName = "booking_details_id"))
    private List<BookingDetails> bookingDetails = new ArrayList<>();


    
}
