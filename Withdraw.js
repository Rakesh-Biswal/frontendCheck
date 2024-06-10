const apiUrl = "https://backend-recent-2.onrender.com";

// Event listener for the withdrawal request form submission
document.getElementById('withDrawReq').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent default form submission

    // Retrieve the user ID from the URL query parameters
    const userId = new URLSearchParams(window.location.search).get('userId');
    if (!userId) {  // If user ID is not present, redirect to the login page
        window.location.href = 'login.html';
        return;
    }

    // Get input values from the form
    const withdrawCoin = parseFloat(document.getElementById('withdrawn-coin').value);
    const UpiId = document.getElementById('upi-id').value;
    const checkPassword = document.getElementById('check-password').value;
    const message = document.getElementById('info');  // Message element to display info

    // Validate the withdrawal amount
    if (isNaN(withdrawCoin) || withdrawCoin <= 0) {
        message.textContent = "Please enter a valid amount to withdraw.";
        return;
    }

    // Show spinner and blur effect while processing the request
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('blurOverlay').style.display = 'block';
    document.getElementById('withdrawPage').classList.add('blur');

    try {
        // Send withdrawal request to the server
        const postResponse = await fetch(`${apiUrl}/RemainsCoin/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ withdrawCoin, UpiId, checkPassword }),  // Removed redundant userId
            credentials: 'include'
        });

        const postData = await postResponse.json();

        // Hide spinner and blur effect after the request is processed
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('withdrawPage').classList.remove('blur');

        if (postResponse.ok) {
            // If withdrawal request is successful, request OTP
            const otpResponse = await fetch(`${apiUrl}/request-otp/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (otpResponse.ok) {
                // Redirect to the OTP page if OTP request is successful
                window.location.href = `otp.html?userId=${userId}`;
            } else {
                // Display error message if OTP request fails
                const otpData = await otpResponse.json();
                message.textContent = otpData.message || 'Failed to send OTP';
            }
        } else {
            // Display error message if withdrawal request fails
            message.textContent = postData.message || 'Transaction failed';
        }
    } catch (postError) {
        // Handle any errors during the request
        console.error(postError);
        message.textContent = 'Transaction failed';

        // Hide spinner and blur effect in case of an error
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('withdrawPage').classList.remove('blur');
    }
});
