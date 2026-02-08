const API_BASE_URL = "https://my-ecommerce-backend-gqci.onrender.com/products";

function addProduct() {
    const product = {
        name: document.getElementById("pname").value,
        price: document.getElementById("pprice").value,
        description: document.getElementById("pdescription").value,
        imageUrl: document.getElementById("pimage").value
    };

    fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    .then(handleResponse)
    .then(data => {
        showProducts([data]);
        clearForm();
    })
    .catch(err => showError(err));
}

function getProductById() {
    const id = document.getElementById("pid").value;
    if (!id) {
        showMessage("Please enter a product ID", "info");
        return;
    }

    fetch(`${API_BASE_URL}/${id}`)
        .then(handleResponse)
        .then(data => showProducts([data]))
        .catch(err => showError(err));
}

function getProductByName() {
    const name = document.getElementById("searchName").value;
    if (!name) {
        showMessage("Please enter a product name", "info");
        return;
    }

    fetch(`${API_BASE_URL}/name/${name}`)
        .then(handleResponse)
        .then(data => showProducts([data]))
        .catch(err => showError(err));
}

function getAllProducts() {
    fetch(API_BASE_URL)
        .then(handleResponse)
        .then(data => showProducts(data))
        .catch(err => showError(err));
}

// Helper function to handle both JSON and text responses
function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    
    if (!response.ok) {
        // If response is not OK, try to get error message
        return response.text().then(text => {
            throw new Error(text || `HTTP ${response.status}: ${response.statusText}`);
        });
    }
    
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        // If response is not JSON, return as text
        return response.text().then(text => {
            // Check if it's an error message
            if (text.toLowerCase().includes("not found") || 
                text.toLowerCase().includes("error") ||
                text.toLowerCase().includes("invalid")) {
                throw new Error(text);
            }
            // Otherwise treat as success message
            return { message: text };
        });
    }
}

function showProducts(products) {

    showProductsSection();
    const container = document.getElementById("productContainer");
    
    // Clear container
    container.innerHTML = "";

    // Handle different response types
    if (!products) {
        showMessage("No response received from server", "error");
        return;
    }

    // If products is an error message string or has a message property
    if (typeof products === "string") {
        if (products.toLowerCase().includes("product not found")) {
            showMessage(products, "info");
        } else {
            showError(products);
        }
        return;
    }

    // Handle single object with message property
    if (products.message) {
        showMessage(products.message, products.message.toLowerCase().includes("not found") ? "info" : "success");
        return;
    }

    // If it's an array but empty
    if (Array.isArray(products) && products.length === 0) {
        showMessage("No products found", "info");
        return;
    }

    // If it's a single object that's not an array
    if (!Array.isArray(products)) {
        products = [products];
    }

    // Display each product
    products.forEach(p => {
        // Check if this is actually an error object
        if (p.error || p.message) {
            if (p.message && p.message.toLowerCase().includes("not found")) {
                showMessage(p.message, "info");
                return;
            }
            showError(p.error || p.message || "Unknown error");
            return;
        }

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${p.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                 alt="${p.name || 'Product image'}"
                 onerror="this.src='https://via.placeholder.com/300x200?text=Image+Error'">
            <h3>${p.name || 'Unnamed Product'}</h3>
            <p>${p.description || "No description available"}</p>
            <p class="price">₹${p.price || '0.00'}</p>
        `;
        container.appendChild(productCard);
    });
}

function showMessage(message, type = "info") {

    showProductsSection(); 
    const container = document.getElementById("productContainer");
    
    // Determine color based on message type
    let bgColor, textColor, borderColor;
    switch(type) {
        case "error":
            bgColor = "#fed7d7";
            textColor = "#9b2c2c";
            borderColor = "#fc8181";
            break;
        case "success":
            bgColor = "#c6f6d5";
            textColor = "#276749";
            borderColor = "#68d391";
            break;
        case "info":
        default:
            bgColor = "#bee3f8";
            textColor = "#2c5282";
            borderColor = "#63b3ed";
            break;
    }
    
    container.innerHTML = `
        <div style="
            color: ${textColor};
            background: ${bgColor};
            border: 1px solid ${borderColor};
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 20px auto;
            max-width: 500px;
            font-size: 1.1rem;
            font-weight: 500;
            grid-column: 1 / -1;
        ">
            ${message}
        </div>
    `;
}

function showError(err) {
    const errorMessage = err.message || err || "An error occurred";
    
    // Check if it's a "not found" type error
    if (errorMessage.toLowerCase().includes("not found") || 
        errorMessage.toLowerCase().includes("404")) {
        showMessage(errorMessage, "info");
    } else {
        showMessage(`Error: ${errorMessage}`, "error");
    }
}

function clearForm() {
    document.getElementById("pname").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pdescription").value = "";
    document.getElementById("pimage").value = "";
}
function showProductsSection() {
    document.querySelector(".response-card").style.display = "block";
}

function hideProductsSection() {
    document.querySelector(".response-card").style.display = "none";
}
window.onload = () => {
    hideProductsSection();
};

