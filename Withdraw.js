const apiUrl = "https://backend-recent-2.onrender.com";

document.getElementById('withDrawReq').addEventListener('submit', async function (event) {
    event.preventDefault();

    const userId = new URLSearchParams(window.location.search).get('userId');
    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    const withdrawCoin = parseFloat(document.getElementById('withdrawn-coin').value);
    const UpiId = document.getElementById('upi-id').value;
    const checkPassword = document.getElementById('check-password').value;
    const message = document.getElementById('info');

    // Reset error styles
    const inputs = document.querySelectorAll('.withdraw-form input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    message.classList.remove('error', 'success');
    message.textContent = '';

    if (isNaN(withdrawCoin) || withdrawCoin <= 0) {
        showMessage("Please enter a valid amount to withdraw.", 'error');
        document.getElementById('withdrawn-coin').classList.add('error');
        return;
    }

    // Show spinner and blur effect
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('blurOverlay').style.display = 'block';
    document.getElementById('withdrawPage').classList.add('blur');

    try {
        const postResponse = await fetch(`${apiUrl}/RemainsCoin/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ withdrawCoin, UpiId, userId, checkPassword }),
            credentials: 'include'
        });

        const postData = await postResponse.json();

        // Hide spinner and blur effect
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('withdrawPage').classList.remove('blur');

        if (postResponse.ok) {
            showMessage(postData.message, 'success');
            window.location.href = `success.html?userId=${userId}`;
        } else {
            showMessage(postData.message, 'error');

            // Highlight invalid inputs
            if (postData.invalidFields) {
                postData.invalidFields.forEach(field => {
                    document.getElementById(field).classList.add('error');
                });
            }
        }
    } catch (postError) {
        console.log(postError);
        showMessage('Transaction failed', 'error');

        // Hide spinner and blur effect in case of error
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('withdrawPage').classList.remove('blur');
    }
});

function showMessage(text, type) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = text;
    popup.className = type;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1000);
}