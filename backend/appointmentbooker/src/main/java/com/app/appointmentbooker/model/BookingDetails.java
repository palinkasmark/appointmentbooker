package com.app.appointmentbooker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "bookingDetails")
@Getter
@Setter
public class BookingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private LocalTime date;

    // @ManyToOne
    // @JoinTable(name = "product_bookings",
    //             joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
    //             inverseJoinColumns = @JoinColumn(name = "booking_id", referencedColumnName = "id"))
    // private Product product;


    

}
