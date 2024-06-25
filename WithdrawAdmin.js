const apiUrl = "https://backend-recent-2.onrender.com";
document.addEventListener('DOMContentLoaded', () => {
    fetchWithdrawals();
  
    async function fetchWithdrawals() {
      try {
        const response = await fetch(`${apiUrl}/admin/withdrawal-requests`);
        const withdrawals = await response.json();
        displayWithdrawals(withdrawals);
      } catch (error) {
        console.error('Error fetching withdrawal requests:', error);
      }
    }
  
    function displayWithdrawals(withdrawals) {
      const container = document.getElementById('withdrawal-requests');
      container.innerHTML = '';
  
      withdrawals.forEach((withdrawal) => {
        const card = document.createElement('div');
        card.className = 'withdrawal-card';
  
        card.innerHTML = `
          <h3>${withdrawal.userId.name}</h3>
          <p>Withdrawal Amount: ${withdrawal.withdrawCoin}</p>
          <p>UPI ID: ${withdrawal.UpiId}</p>
          <p>Date: ${new Date(withdrawal.createdAt).toLocaleDateString()}</p>
          <div class="buttons">
            <button onclick="updateStatus('${withdrawal._id}', 'success')">Approve</button>
            <button onclick="updateStatus('${withdrawal._id}', 'rejected')">Reject</button>
          </div>
        `;
  
        container.appendChild(card);
      });
    }
  });
  
  async function updateStatus(paymentId, status) {
    try {
      await fetch(`${apiUrl}/admin/withdrawal-requests/${paymentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
  
      // Remove the card from the UI
      document.querySelector(`button[onclick="updateStatus('${paymentId}', '${status}')"]`).closest('.withdrawal-card').remove();
    } catch (error) {
      console.error('Error updating withdrawal request status:', error);
    }
  }
  