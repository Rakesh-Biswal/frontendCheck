const apiUrl = "https://backend-recent-2.onrender.com";

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value;
    const linkStatus = [];

    if (password !== confirmPassword) {
        showMessage('Passwords do not match');
        return;
    }

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
            body: JSON.stringify({ name, phone, email, password, ip, otp, linkStatus, referralId }),
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
        showMessage('Something went wrong');
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('container').classList.remove('blur');
    }
});

document.getElementById('generateOTP').addEventListener('click', async () => {
    const email = document.getElementById('email').value;

    if (!email) {
        showMessage('Please enter an email address to generate OTP');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/generate-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('otp').value = data.otp;
            showMessage('OTP sent to your email');
        } else {
            showMessage(data.message);
        }
    } catch (error) {
        console.log('Error:', error);
        showMessage('Failed to send OTP');
    }
});

function showMessage(message) {
    document.getElementById('message').textContent = message;
}
