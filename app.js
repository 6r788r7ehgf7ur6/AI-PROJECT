// script.js
const API_KEY = "AIzaSyCM59OzWWsxzrBSA_flpfi_ugJaPTpPmi4";

function sendMessage() {
    let inputField = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let userMessage = inputField.value;
    
    if (userMessage.trim() === "") return;
    
    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    inputField.value = "";
    
    fetchGeminiResponse(userMessage);
}

async function fetchGeminiResponse(message) {
    let chatBox = document.getElementById("chat-box");

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        let data = await response.json();
        let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure about that.";

        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Bot:</strong> Sorry, something went wrong.</p>`;
    }
}
