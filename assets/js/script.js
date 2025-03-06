const apiUrl = 'https://cms-backend-bfve.onrender.com';

// Check if we're on the login page
if (window.location.pathname.includes('login.html')) {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
            window.location.href = 'https://your-cms-backend.render.com/cms-dashboard';
        } else {
            document.getElementById('login-message').style.display = 'block';
            document.getElementById('login-message').textContent = 'Login failed. Please try again.';
        }
    });
} else {
    // Homepage logic
    fetch(`${apiUrl}/content`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            const intro = data.find(item => item.section === 'intro_text');
            document.getElementById('intro-text').textContent = intro ? intro.value : 'Showcasing our finest web designs and custom CMS solutions.';
        })
        .catch(err => console.error('Error fetching intro text:', err));

    const expandingBox = document.getElementById('expanding-box');
    expandingBox.addEventListener('animationend', () => {
        expandingBox.style.background = '#2c003e';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('SecurePixel loaded');
});
