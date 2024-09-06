async function login(username, password) {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.jwtToken); // Зберігаємо токен у localStorage
            window.location.href = '../index.html';
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function register(username, email, password) {
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            // Можна перенаправити користувача на сторінку логіну
            window.location.href = '/auth/login.html';
        } else {
            const errorText = await response.text();
            alert("Registration failed: " + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Registration failed: " + error.message);
    }
}

async function checkAuth() {
    const token = localStorage.getItem('jwtToken');
    console.log(`token: ${token}`);
    if (!token) {
        // Якщо токену немає, перенаправляємо на сторінку логіну
        window.location.href = '/auth/login.html';
        console.log(`no token: ${token}`);
        return false;
    }

    try {
        const response = await fetch('http://localhost:8080/auth/validate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return true; // Користувач авторизований
        } else {
            // Якщо токен недійсний, видаляємо його і перенаправляємо на сторінку логіну
            localStorage.removeItem('jwttoken');
            window.location.href = '/auth/login.html';
            return false;
        }
    } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('jwttoken');
        window.location.href = '/auth/login.html';
        return false;
    }
}

function handleRegister() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    register(username, email, password);
}
