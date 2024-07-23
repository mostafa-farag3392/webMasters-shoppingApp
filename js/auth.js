document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    updateAuthLinks();
    checkAuthOnRestrictedPages();
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Mock login logic
    const user = { email, name: 'User' };
    localStorage.setItem('user', JSON.stringify(user));
    
    setTimeout(() => {
        window.location.href = 'shop.html'; 
    }, 1000);
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Mock registration logic
    const user = { name, email };
    localStorage.setItem('user', JSON.stringify(user));
    
    setTimeout(() => {
        document.getElementById('register-container').classList.remove('active');
        document.getElementById('login-container').classList.add('active');
    }, 1000);
}

function updateAuthLinks() {
    const authLinks = document.getElementById('auth-links');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        authLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="profile.html">Hello, ${user.name}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="logout-link">Logout</a>
            </li>
        `;

        document.getElementById('logout-link').addEventListener('click', handleLogout);
    } else {
        authLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="#" id="show-login-link">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="show-register-link">Register</a>
            </li>
        `;

        document.getElementById('show-login-link').addEventListener('click', showLogin);
        document.getElementById('show-register-link').addEventListener('click', showRegister);
    }
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    updateAuthLinks();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

function checkAuthOnRestrictedPages() {
    const restrictedPages = ['cart.html', 'shop.html'];
    const user = JSON.parse(localStorage.getItem('user'));
    
    restrictedPages.forEach(page => {
        if (window.location.pathname.includes(page) && !user) {
            alert('You must be logged in to view this page.');
            window.location.href = 'auth.html';
        }
    });
}

function showLogin(event) {
    event.preventDefault();
    document.getElementById('register-container').classList.remove('active');
    document.getElementById('login-container').classList.add('active');
}

function showRegister(event) {
    event.preventDefault();
    document.getElementById('login-container').classList.remove('active');
    document.getElementById('register-container').classList.add('active');
}














