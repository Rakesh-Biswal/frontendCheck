const apiUrl = "https://backend-recent-2.onrender.com";

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const linkStatus = []; // Initialize with default values or get from the form

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

    // Fetch IP address
    let ip = '';
    axios.get('https://api.ipify.org?format=json')
        .then(function(response) {
            ip = response.data.ip;

            // Extract referralId from URL if present
            const urlParams = new URLSearchParams(window.location.search);
            const referralId = urlParams.get('referralId') || null;

            // Show spinner and blur effect
            document.getElementById('loadingSpinner').style.display = 'block';
            document.getElementById('blurOverlay').style.display = 'block';
            document.getElementById('container').classList.add('blur');

            fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone, email, password, ip, linkStatus, referralId }) // Include referralId in the registration data
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
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
            })
            .catch(function(error) {
                console.log('Error:', error);
                showMessage('Something went wrong');
                
                // Hide spinner and blur effect in case of error
                document.getElementById('loadingSpinner').style.display = 'none';
                document.getElementById('blurOverlay').style.display = 'none';
                document.getElementById('container').classList.remove('blur');
            });
        })
        .catch(function(error) {
            console.error('Error getting IP:', error);
            ip = ''; // Set ip to empty string if there's an error
        });
});
