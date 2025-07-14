const products = [
    {
        id: 1,
        name: "Smith & Wesson M&P15",
        price: 899.99,
        category: "Rifles",
        description: "Semi-automatic rifle with 16-inch barrel",
        stock: 5,
        featured: true,
        image: "../images/Mp15bg.jpg"

    },
    {
        id: 2,
        name: "Glock 19 Gen 5",
        price: 549.99,
        category: "Handguns",
        description: "Compact 9mm pistol",
        stock: 8,
        featured: true,
        image: "../images/glock19.jpg"
    },
    {
        id: 3,
        name: "Remington 870 Express",
        price: 449.99,
        category: "Shotguns",
        description: "12-gauge pump-action shotgun",
        stock: 3,
        featured: true,
        image: "../images/remington.jpeg"
    },
    {
        id: 4,
        name: "Ruger 10/22",
        price: 299.99,
        category: "Rifles",
        description: "Semi-automatic .22 LR rifle",
        stock: 12,
        featured: false,
        image: "../images/ruger.jpg"
    },
    {
        id: 5,
        name: "Sig Sauer P320",
        price: 649.99,
        category: "Handguns",
        description: "Modular striker-fired pistol",
        stock: 6,
        featured: false,
        image: "../images/sig.jpeg"
    },
    {
        id: 6,
        name: "Mossberg 500",
        price: 399.99,
        category: "Shotguns",
        description: "Versatile pump-action shotgun",
        stock: 4,
        featured: false,
        image: "../images/mossberg.png"
    }

];

let cart = [];
let currentUser = null;
let isAdmin = false;

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('contact-form').addEventListener('submit', handleContact);
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function loadProducts() {
    loadFeaturedProducts();
    loadCatalogProducts();
}

function loadFeaturedProducts() {
    const featuredProducts = products.filter(p => p.featured);
    const container = document.getElementById('featured-products');
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadCatalogProducts() {
    const container = document.getElementById('catalog-products');
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        cart.push(product);
        updateCartCount();
        alert(`${product.name} added to cart!`);
    } else {
        alert('Product out of stock!');
    }
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function showCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let cartContent = 'Your Cart:\n\n';
    let total = 0;

    cart.forEach(item => {
        cartContent += `${item.name} - $${item.price.toFixed(2)}\n`;
        total += item.price;
    });

    cartContent += `\nTotal: $${total.toFixed(2)}`;
    alert(cartContent);
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        currentUser = username;
        isAdmin = true;
        document.getElementById('admin-link').style.display = 'inline';
        showPage('admin');
    } else if (username && password) {
        currentUser = username;
        showPage('home');
    } else {
        alert('Invalid credentials');
        return;
    }

    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'inline-block';
    alert(`Welcome, ${currentUser}!`);
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    alert('Registration successful! Please login.');
    showPage('login');
}

function logout() {
    currentUser = null;
    isAdmin = false;
    document.getElementById('admin-link').style.display = 'none';
    document.getElementById('login-btn').style.display = 'inline-block';
    document.getElementById('logout-btn').style.display = 'none';
    showPage('home');
    alert('Logged out successfully!');
}

function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    e.target.reset();
}

function scrollToProducts() {
    const productsSection = document.querySelector('.content-section');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// FAQ functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    // Close all FAQ answers
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('active');
    });
    
    // Toggle current answer
    if (!isActive) {
        answer.classList.add('active');
    }
}