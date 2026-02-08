# Ecommerce Product Management API

- This project is a simple Spring Boot REST API created to manage products in an eCommerce application.
- It provides APIs to add products and retrieve product details in different ways.
- The application uses in-memory storage (ArrayList) and does not include any database.

## Features

- Add product
- Get product by ID
- Get product by product name
- Get all products
- Basic validation
- Duplicate product name checking
- CORS enabled for frontend connection



## Technologies Used

- Java
- Boot
- Spring Web
- Security
- Maven



## Project Structure
com.example.EcommerceApp
│
├── controller
│ └── ProductController.java
│
├── service
│ └── ProductService.java
│
├── model
│ └── Product.java



## CORS & Security Configuration

- This project uses **Spring Security** with a custom CORS configuration.

CORS is enabled to allow frontend access from:

- http://127.0.0.1:5500
- http://localhost:3000
- https://ecommerce-app-three-ruby.vercel.app
- https://ecommerce-app-git-main-manonmani.vercel.app
- https://ecommerce-app-manonmani.vercel.app

- All `/products/**` endpoints are publicly accessible.
- CSRF protection is disabled for simplicity since this is a REST API.


## API Details

### 1. Add Product
Method: POST  
URL: `/products`

Request body example:
json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 75000,
  "imageUrl": "https://example.com/laptop.jpg"
}

Success Response (201 CREATED):
{
  "id": 1,
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 75000,
  "imageUrl": "https://example.com/laptop.jpg"
}

Error Responses (400 BAD REQUEST:

- Product name is required
- Price must be greater than zero
- Product already exists

### 2. Get Product by ID

Method: GET
URL: `/products/{id}`

Success Response(200 OK):

{
  "id": 1,
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 75000,
  "imageUrl": "https://example.com/laptop.jpg"
}

Error Response(404 NOT FOUND):
- Product not found
- Price must be greater than zero
- Product already exists

- Error responses are returned as plain text, not JSON.

### 3. Get Product by Product Name

Method: GET
URL: `/products/name/{name}`

 Success Response(200 OK):

{
  "id": 1,
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 75000,
  "imageUrl": "https://example.com/laptop.jpg"
}

Error Response(404 NOT FOUND):
- Product not found


## 4. Get All Products

Method: GET
URL: `/products`

Success Response – Products Available (200 OK):
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 75000,
    "imageUrl": "https://example.com/laptop.jpg"
  },
  {
    "id": 2,
    "name": "Mobile",
    "description": "Android smartphone",
    "price": 25000,
    "imageUrl": "https://example.com/mobile.jpg"
  }
]

Success Response – No Products Available (200 OK):
[]

- If no products exist, an empty list is returned.
- This API never returns an error in normal conditions.

## Validations

- Product name should not be null or empty
- Product price must be greater than zero
- Same product name cannot be added again

## Conclusion

This project demonstrates a basic Spring Boot REST API with:

- Clean controller–service separation
- Proper validations
- REST-style endpoints
- Frontend-ready CORS support
