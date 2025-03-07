const apiUrl = 'https://your-cms-backend.onrender.com/api';
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Include cookies
        });
        const data = await response.json();
        if (data.success) {
            window.location.href = 'https://your-cms-backend.onrender.com/cms-dashboard';
        } else {
            document.getElementById('login-message').textContent = 'Login failed';
            document.getElementById('login-message').style.display = 'block';
        }
    } catch (err) {
        console.error('Error:', err);
    }
});
