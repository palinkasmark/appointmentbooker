package com.app.appointmentbooker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.appointmentbooker.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(
        value = "select * from product where productName = :productName", 
        nativeQuery = true)
    Product findByProductName(@Param("productName") String productName);

    @Query(
        value = "SELECT * FROM product JOIN shop_products ON shop_products.prod_id = product.product_id JOIN shop ON :shopId = shop_products.shop_id",
        nativeQuery = true
    )
    List<Product> getProductsByShop(@Param("shopId") Integer shopId);
}
