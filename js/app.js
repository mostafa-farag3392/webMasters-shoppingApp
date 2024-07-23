document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateAuthLinks();
    updateCartCounter();
    document.getElementById('filter-category').addEventListener('change', fetchProducts);
    document.getElementById('sort-price').addEventListener('change', fetchProducts);
});

function fetchProducts() {
    const category = document.getElementById('filter-category').value;
    const sortOrder = document.getElementById('sort-price').value;

    // Simulating API call with static products
    const products = [
        { id: 1, name: 'Sneakers', price: 29.99, image: './images/product 1.png', category: 'sprts' },
        { id: 2, name: 'Sport short', price: 49.99, image: './images/product 2.jpg', category: 'sprts' },
        { id: 3, name: 'Sport short', price: 19.99, image: './images/product 3.png', category: 'sprts' },
        { id: 4, name: 'Sport short', price: 99.99, image: './images/product 4.png', category: 'sprts' },
        { id: 5, name: 'Women bag', price: 25.99, image: './images/product 5.png', category: 'women' },
        { id: 6, name: 'Women bag', price: 12.99, image: './images/product 6.png', category: 'women' },
        { id: 7, name: 'Women bag', price: 30.99, image: './images/product 7.png', category: 'women' },
        { id: 8, name: 'Sneakers', price: 27.99, image: './images/product 8.png', category: 'sprts' },
        { id: 9, name: 'Classic shirt', price: 17.99, image: './images/product 9.png', category: 'clothing' },
        { id: 10, name: 'Casual hodi', price: 16.99, image: './images/product 10.png', category: 'clothing' },
        { id: 11, name: 'Sport short', price: 22.99, image: './images/product 11.jpg', category: 'sprts' },
        { id: 12, name: 'Classic shirt', price: 21.99, image: './images/product 12.png', category: 'clothing' },
        { id: 13, name: 'Sneakers', price: 10.99, image: './images/product 13.jpg', category: 'sprts' },
        { id: 14, name: 'Sneakers', price: 14.99, image: './images/product 14.jpg', category: 'sprts' },
        { id: 15, name: 'Sneakers', price: 28.99, image: './images/product 15.png', category: 'sprts' }
    ];

    let filteredData = products;
    if (category) {
        filteredData = products.filter(product => product.category === category);
    }
    if (sortOrder) {
        filteredData.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }
    displayProducts(filteredData);
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="col-lg-3 col-md-2 col-sm-4">
            <div class="card mb-2">
                <img src="${product.image}" class="card-img-top p-1 mb-0" alt="${product.name}">
                <div class="card-body mx-auto">
                    <h5 class="card-title my-0">${product.name}</h5>
                    <p class="card-text my-0">$${product.price.toFixed(2)}</p>
                    <div class="mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                    <button class="btn btn-primary mx-auto mb-0" data-product-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>
                    
                </div>
            </div>
        </div>
    `).join('');
}

function updateAuthLinks() {
    const authLinks = document.getElementById('auth-links');
    const isLoggedIn = !!localStorage.getItem('user');
    
    if (isLoggedIn) {
        authLinks.innerHTML = `
            <div class="navbar-text">Hello, ${JSON.parse(localStorage.getItem('user')).name}</div>
            <a class="nav-link" href="#" id="logout-link">Logout</a>
        `;
        document.getElementById('logout-link').addEventListener('click', () => {
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            updateAuthLinks();
            updateCartCounter();
            window.location.href = 'index.html';
        });
    } else {
        authLinks.innerHTML = `
            <a class="nav-link" href="login.html">Login</a>
            <a class="nav-link" href="register.html">Register</a>
        `;
    }
}

function addToCart(productId) {
    if (!localStorage.getItem('user')) {
        alert('Please log in to add items to the cart.');
        window.location.href = 'login.html';
        return;
    }

    const products = [
        { id: 1, name: 'Sneakers', price: 29.99, image: './images/product 1.png', category: 'sprts' },
        { id: 2, name: 'Sport short', price: 49.99, image: './images/product 2.jpg', category: 'sprts' },
        { id: 3, name: 'Sport short', price: 19.99, image: './images/product 3.png', category: 'sprts' },
        { id: 4, name: 'Sport short', price: 99.99, image: './images/product 4.png', category: 'sprts' },
        { id: 5, name: 'Women bag', price: 25.99, image: './images/product 5.png', category: 'women' },
        { id: 6, name: 'Women bag', price: 12.99, image: './images/product 6.png', category: 'women' },
        { id: 7, name: 'Women bag', price: 30.99, image: './images/product 7.png', category: 'women' },
        { id: 8, name: 'Sneakers', price: 27.99, image: './images/product 8.png', category: 'sprts' },
        { id: 9, name: 'Classic shirt', price: 17.99, image: './images/product 9.png', category: 'clothing' },
        { id: 10, name: 'Casual hodi', price: 16.99, image: './images/product 10.png', category: 'clothing' },
        { id: 11, name: 'Sport short', price: 22.99, image: './images/product 11.jpg', category: 'sprts' },
        { id: 12, name: 'Classic shirt', price: 21.99, image: './images/product 12.png', category: 'clothing' },
        { id: 13, name: 'Sneakers', price: 10.99, image: './images/product 13.jpg', category: 'sprts' },
        { id: 14, name: 'Sneakers', price: 14.99, image: './images/product 14.jpg', category: 'sprts' },
        { id: 15, name: 'Sneakers', price: 28.99, image: './images/product 15.png', category: 'sprts' }
    ];

    const product = products.find(product => product.id === parseInt(productId));
    if (product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        alert('Product added to cart!');
    }
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalContainer.innerHTML = '';
        return;
    }

    cartContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item d-flex align-items-center mb-2 border border-light-subtle rounded-3">
            <img src="${item.image}" alt="${item.name}" class="m-2 w-25">
            <div>
                <h5>${item.name}</h5>
                <p>$${item.price.toFixed(2)}</p>
                <input type="number" class="form-control quantity" value="${item.quantity}" data-product-id="${item.id}">
                <button class="btn btn-danger btn-sm mt-2" data-product-id="${item.id}" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const newQuantity = parseInt(event.target.value);
            updateCartQuantity(productId, newQuantity);
        });
    });

    updateCartTotal(cartItems);
}

function updateCartTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = parseFloat(localStorage.getItem('discount')) || 0;
    const finalTotal = total - discount;

    document.getElementById('cart-total').innerHTML = `
        <h4>Total: $${finalTotal.toFixed(2)}</h4>
        <hr>
        ${discount > 0 ? `<p>Discount Applied: -$${discount.toFixed(2)}</p>` : ''}
    `;
}

function applyDiscount() {
    const discountCode = document.getElementById('discount-code').value;
    // Mock discount logic
    const discount = discountCode === 'SAVE10' ? 10 : 0;
    localStorage.setItem('discount', discount);
    updateCart();
}

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();
    updateCartCounter();
}

function updateCartQuantity(productId, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === parseInt(productId));
    if (product) {
        product.quantity = newQuantity;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            updateCartCounter();
        }
    }
}
