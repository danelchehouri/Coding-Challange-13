// app.js
document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://course-api.com/react-store-products';
    const productContainer = document.getElementById('product-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    let products = [];
    let currentIndex = 0;

    async function fetchProducts() {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            products = await response.json();
            displayProduct();
            loadingElement.classList.add('hidden');
            productContainer.classList.remove('hidden');
            document.getElementById('prev').classList.remove('hidden');
            document.getElementById('next').classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching product data:', error);
            loadingElement.classList.add('hidden');
            errorElement.classList.remove('hidden');
        }
    }

    function displayProduct() {
        const product = products[currentIndex];
        productContainer.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>$${product.price}</p>
        `;
    }

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        displayProduct();
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        displayProduct();
    });

    fetchProducts();
});
