const apiUrl = "https://backend-recent-2.onrender.com";

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value; // Get OTP input value
    const linkStatus = []; // Initialize with default values or get from the form

    // Check if passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match');
        return;
    }

    // Fetch IP address
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error getting IP:', error);
            return ''; // Return empty string or handle the error appropriately
        });

    function showMessage(message) {
        document.getElementById('message').textContent = message;
    }

    function showSuccessMessage(message) {
        alert(message);
    }

    // Extract referralId from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const referralId = urlParams.get('referralId') || null;

    // Show spinner and blur effect
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('blurOverlay').style.display = 'block';
    document.getElementById('container').classList.add('blur');  

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, email, password, ip, otp, linkStatus, referralId }), // Include OTP in the registration data
            credentials: 'include'
        });

        const data = await response.json();
        // Hide spinner and blur effect
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('container').classList.remove('blur');

        if (response.ok) {
            showSuccessMessage(data.message);
            window.location.href = "login.html";
        } else {
            showMessage(data.message);
        }
    } catch (error) {
        console.log('Error:', error);
        showMessage('Something wrong happened');
        // Hide spinner and blur effect in case of error
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('container').classList.remove('blur');
    }
});
