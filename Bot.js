// script.js
document.addEventListener("DOMContentLoaded", function () {
    const chatbotMessages = document.getElementById("chatbot-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", function () {
        sendMessage(userInput.value);
    });

    userInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage(userInput.value);
        }
    });

    function sendMessage(message) {
        if (message.trim() === "") return;

        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = message;
        chatbotMessages.appendChild(userMessage);

        // Simulate the bot asking for a photo
        const botMessage1 = document.createElement("div");
        botMessage1.classList.add("bot-message");
        botMessage1.textContent = "Please share a photo of the garbage:";
        chatbotMessages.appendChild(botMessage1);

        // Simulate the bot asking for location
        const botMessage2 = document.createElement("div");
        botMessage2.classList.add("bot-message");
        botMessage2.textContent = "Please share your precise location:";
        chatbotMessages.appendChild(botMessage2);

        userInput.value = "";
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
