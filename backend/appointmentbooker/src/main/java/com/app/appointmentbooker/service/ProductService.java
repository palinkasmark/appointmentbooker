package com.app.appointmentbooker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.appointmentbooker.model.Product;
import com.app.appointmentbooker.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;


    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    public Product findByProductName(String productName){
        return productRepository.findByProductName(productName);
    }

    public Optional<Product> findProductById(Integer id) {
        return productRepository.findById(id);
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    
}
