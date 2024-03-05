const sendBtn = document.querySelector("#sendBtn");
const chatInput = document.querySelector(".chatInput textarea");
const chatBox = document.querySelector(".chatbox");

let userMessage;

function addMessage(chatLi) {
	chatBox.appendChild(chatLi);
}

function createMessage(message, className) {
	const chatLi = document.createElement("li");
	chatLi.classList.add("message", className);
	if (className === "outgoing") {
		chatLi.innerHTML = `<p>${message}</p>`;
	} else {
		chatLi.innerHTML = `<i class="fa-solid fa-robot"></i>
        <p>${message}</p>`;
	}
	return chatLi;
}
async function generateResponse(incomingMessageLi) {
	const API_URL = "https://api.openai.com/v1/chat/completions";
	const API_KEY = "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";

	const messageElement = incomingMessageLi.querySelector("p");

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: userMessage,
				},
			],
		}),
	};

	try {
		const response = await fetch(API_URL, requestOptions);
		const data = await response.json();
		if (response.ok) {
			messageElement.textContent = data.choices[0].message.content;
		} else {
			console.error("Error:", data);
			messageElement.textContent = data.error.message;
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

function handleChat() {
	userMessage = chatInput.value.trim();
	if (!userMessage) {
		return;
	}

	const outgoingMessageLi = createMessage(userMessage, "outgoing");
	addMessage(outgoingMessageLi);

	setTimeout(() => {
		const incomingMessageLi = createMessage("Typing...", "incoming");
		addMessage(incomingMessageLi);
		generateResponse(incomingMessageLi);
	}, 500);
}

sendBtn.addEventListener("click", handleChat);
