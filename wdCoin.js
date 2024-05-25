

const apiUrl = "https://backend-recent-2.onrender.com";
document.addEventListener('DOMContentLoaded', async () => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    if (!userId) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch(`${apiUrl}/wdcoin/${userId}`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('coinNo').textContent = data.coins;
            console.log(data.coins);

        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }

});