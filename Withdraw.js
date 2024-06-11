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

    if (isNaN(withdrawCoin) || withdrawCoin <= 0) {
        message.textContent = "Please enter a valid amount to withdraw.";
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



        if (postResponse.ok) {

            window.location.href = `success.html?userId=${userId}`;
            // Hide spinner and blur effect
            document.getElementById('loadingSpinner').style.display = 'none';
            document.getElementById('blurOverlay').style.display = 'none';
            document.getElementById('withdrawPage').classList.remove('blur');
        } else {
            // Hide spinner and blur effect
            document.getElementById('loadingSpinner').style.display = 'none';
            document.getElementById('blurOverlay').style.display = 'none';
            document.getElementById('withdrawPage').classList.remove('blur');
            message.textContent = postData.message;
        }
    } catch (postError) {
        console.log(postError);
        message.textContent = 'Transaction failed';

        // Hide spinner and blur effect in case of error
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('blurOverlay').style.display = 'none';
        document.getElementById('withdrawPage').classList.remove('blur');
    }
});