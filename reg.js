const apiUrl = "https://backend-recent-1.onrender.com";
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const ss = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => console.error('Error getting IP:', error));

    // Check if passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match');
        return;
    }

    function showMessage(message) {
        document.getElementById('message').textContent = message;
    }
    function showSuccessMessage(message) {
        alert(message);
    }

    try {
        let ip = ss.toString()
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, email, password,ip}),
            credentials: 'include'
        });
        const data = await response.json();
        console.log(response);
        if (response.ok) {
            // Registration successful
            showSuccessMessage(data.message);
            window.location.href = "login.html";
        } else {
            // Registration failed
            showMessage(data.message);
        }
    } catch (error) {
        console.log('Error:', error);
        showMessage('Registration failed');
    }
});