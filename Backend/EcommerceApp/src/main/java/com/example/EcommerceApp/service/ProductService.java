package com.example.EcommerceApp.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.EcommerceApp.model.Product;

@Service
public class ProductService {

    private ArrayList<Product> products = new ArrayList<>();
    private int currentId = 1;

    public Product addProduct(Product product) {

        // 1️⃣ Validation
        if (product.getName() == null || product.getName().isBlank()) {
            throw new IllegalArgumentException("Product name is required");
        }

        if (product.getPrice() == null || product.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero");
        }

        // 2️⃣ Check duplicate (ONLY READ, NO MODIFY)
        for (Product existing : products) {
            if (existing.getName().equalsIgnoreCase(product.getName())) {
                throw new IllegalArgumentException("Product already exists");
            }
        }

        // 3️⃣ Modify list ONLY AFTER LOOP
        product.setId(currentId++);
        products.add(product);

        return product;
    }


    // Get product by ID
    public Product getProductById(int id) {
        for (Product p : products) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }

    // Get product by name
    public Product getProductByName(String name) {

        if (name == null || name.isBlank()) {
            return null;
        }

        for (Product p : products) {
            if (p.getName().equalsIgnoreCase(name)) {
                return p;
            }
        }
        return null;
    }

    // Get all products (BONUS)
    public ArrayList<Product> getAllProducts() {
        return products;
    }
}
