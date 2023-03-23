package com.app.appointmentbooker.model;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

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
    private List<LocalTime> reservedDates = new ArrayList<>();
    private int price;

    
    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", duration=" + duration + ", availableDates=" + availableDates
                + ", reservedDates=" + reservedDates + ", price=" + price + "]";
    }
    
    
    

}
