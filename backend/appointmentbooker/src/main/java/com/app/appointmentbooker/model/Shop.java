package com.app.appointmentbooker.model;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "shop")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private LocalTime openFrom;
    private LocalTime openTo;


    @OneToMany
    @Cascade(CascadeType.ALL)
    @JoinTable(name = "shop_products",
                joinColumns = @JoinColumn(name = "shop_id", referencedColumnName = "id"),
                inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private List<Product> products = new ArrayList<>();
    
}
