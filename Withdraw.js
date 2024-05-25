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
            message.textContent = "Transaction Successful";
            alert("Money will be credited within 24 hours.");
            window.location.href = `dashboard.html?userId=${userId}`;
        } else {
            message.textContent = postData.message;
        }
    } catch (postError) {
        console.log(postError);
        message.textContent = 'Transaction failed';
    }


});