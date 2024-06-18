const apiUrl = "https://backend-recent-2.onrender.com";

// Generate or retrieve unique identifier
const uniqueIdentifier = localStorage.getItem('uniqueIdentifier') || generateUniqueIdentifier();

if (!localStorage.getItem('uniqueIdentifier')) {
    localStorage.setItem('uniqueIdentifier', uniqueIdentifier);
}

function generateUniqueIdentifier() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const linkStatus = [];
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match');
        return;
    }

    // Fetch IP address from third-party API
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error getting IP:', error);
            return '';
        });

    function showMessage(message) {
        document.getElementById('message').textContent = message;
    }

    function showSuccessMessage(message) {
        alert(message);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const referralId = urlParams.get('referralId') || null;

    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('blurOverlay').style.display = 'block';
    document.getElementById('container').classList.add('blur');

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, email, password, ip, linkStatus, referralId, uniqueIdentifier }),
            credentials: 'include'
        });

        const data = await response.json();
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
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('container').classList.remove('blur');
    }
});
