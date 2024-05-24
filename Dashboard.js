const apiUrl = "https://backend-recent-2.onrender.com";
document.addEventListener('DOMContentLoaded', () => {
  const linkBoxes = document.querySelectorAll('.link-box');
  const coinBank = document.getElementById('Total-coin');
  let totalCoins = parseInt(coinBank.textContent || '0');

  linkBoxes.forEach((linkBox, boxIndex) => {
    let clickCount = parseInt(localStorage.getItem(`clickCount${boxIndex}`) || '0');
    const links = linkBox.querySelectorAll('a');
    const rankDisplay = document.createElement('div');
    rankDisplay.className = 'rank-number';
    rankDisplay.textContent = `${clickCount}/4`;
    linkBox.appendChild(rankDisplay);

    links.forEach((link, linkIndex) => {
      if (localStorage.getItem(`linkClicked${boxIndex}_${linkIndex}`)) {
        link.classList.add('clicked');
        link.style.pointerEvents = 'none';
        link.style.filter = 'blur(2px)';
      }

      link.addEventListener('click', (event) => {
        clickCount++;
        localStorage.setItem(`clickCount${boxIndex}`, clickCount);
        rankDisplay.textContent = `${clickCount}/4`;

        if (clickCount === 4) {
          totalCoins += 40;
          coinBank.textContent = totalCoins;
          localStorage.setItem('totalCoins', totalCoins);
          updateCoinsOnServer(totalCoins);
        }

        localStorage.setItem(`linkClicked${boxIndex}_${linkIndex}`, 'true');
        link.classList.add('clicked');
        link.style.pointerEvents = 'none';
        link.style.filter = 'blur(2px)';
      });
    });
  });
});

function updateCoinsOnServer(totalCoins) {
  // Send a request to update coins on the server
  fetch('${apiUrl}/update-coins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ totalCoins })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
  })
  .catch(error => {
    console.error('Error updating coins:', error);
  });
}
