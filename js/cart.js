document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    document.getElementById('apply-discount')?.addEventListener('click', applyDiscount);
    document.getElementById('cart-items')?.addEventListener('click', handleCartActions);
});

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
        <div class="cart-item d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h5>${item.name}</h5>
                <p>$${item.price.toFixed(2)}</p>
                <input type="number" class="form-control quantity" value="${item.quantity}" data-product-id="${item.id}">
                <button class="btn btn-danger btn-sm mt-2" data-product-id="${item.id}" id="remove-item">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartTotal(cartItems);
}

function updateCartTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = parseFloat(localStorage.getItem('discount')) || 0;
    const finalTotal = total - discount;

    document.getElementById('cart-total').innerHTML = `
        <h4>Total: $${finalTotal.toFixed(2)}</h4>
        ${discount > 0 ? `<p>Discount Applied: -$${discount.toFixed(2)}</p>` : ''}
    `;
}

function applyDiscount() {
    const discountCode = document.getElementById('discount-code').value;
    const discount = discountCode === 'SAVE10' ? 10 : 0;
    localStorage.setItem('discount', discount);
    updateCart();
}

function handleCartActions(event) {
    if (event.target.id === 'remove-item') {
        const productId = event.target.getAttribute('data-product-id');
        removeFromCart(productId);
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartCounter();
}

