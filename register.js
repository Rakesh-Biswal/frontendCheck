const apiUrl = "https://backend-recent-1.onrender.com";
document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("registrationMessage").innerText = "Passwords do not match";
        return;
    }

    const userData = {
        name,
        dob,
        phone,
        password
    };

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Display an alert upon successful registration
        } else {
            document.getElementById("registrationMessage").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
    }
});