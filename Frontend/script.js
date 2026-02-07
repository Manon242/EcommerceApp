const API_BASE_URL = "https://my-ecommerce-backend.onrender.com/products";

// Change this when backend is deployed

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
    .then(res => res.json())
    .then(data => showProducts([data]))
    .catch(err => showError(err));
}

function getProductById() {
    const id = document.getElementById("pid").value;

    fetch(`${API_BASE_URL}/${id}`)
        .then(res => res.json())
        .then(data => showProducts([data]))
        .catch(err => showError(err));
}

function getProductByName() {
    const name = document.getElementById("searchName").value;

    fetch(`${API_BASE_URL}/name/${name}`)
        .then(res => res.json())
        .then(data => showProducts([data]))
        .catch(err => showError(err));
}

function getAllProducts() {
    fetch(API_BASE_URL)
        .then(res => res.json())
        .then(data => showProducts(data))
        .catch(err => showError(err));
}

function showProducts(products) {

    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    if (typeof products === "string") {
        container.innerHTML = `<p style="color:red">${products}</p>`;
        return;
    }

    products.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.imageUrl || 'https://via.placeholder.com/300'}">
                <h3>${p.name}</h3>
                <p>${p.description || "No description"}</p>
                <p class="price">₹${p.price}</p>
            </div>
        `;
    });
}

function showError(err) {
    document.getElementById("productContainer").innerHTML =
        `<p style="color:red">Error occurred</p>`;
}
