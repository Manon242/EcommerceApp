# Ecommerce Product Frontend
This project is a simple frontend application built using HTML, CSS, and JavaScript.
It connects to a Spring Boot REST API backend to manage products in an eCommerce system.

The application allows users to add products, search products, and view product details through a clean, card-based UI.

## Features
- Add a new product
- Get product by ID
-  product by product name
- View all products
- Display products in a responsive card-based layout
- Show success, error, and info messages
-  section is displayed only when data is available

## Tech Stack
- HTML
- CSS
- JavaScript (Fetch API)

## Backend API
The frontend communicates with the backend using REST APIs.

Base URL:
https://my-ecommerce-backend-gqci.onrender.com/products

## How to Run Locally
1. Clone the repository
2. Open `index.html` in a browser
3. Ensure the backend is running and accessible
4. If running backend locally, make sure CORS allows: http://127.0.0.1:5500


## Live Application
https://ecommerce-app-manonmani.vercel.app

## Notes
- Backend uses in-memory data storage (ArrayList)
- No database is used
- Error responses from backend may be plain text or JSON
- This project is intended for learning frontend–backend integration
