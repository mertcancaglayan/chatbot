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
			messageElement.innerHTML =
				data.error.message +
				" " +
				"<br><strong class='errorMessage'>OpenAI'a ödeme yapmadığım için 'kota yetersiz' hatası geliyor. Düzgün kullanamayacağınız için üzgünüm.</strong>";
		}
	} catch (error) {
		console.error("Error:", error);
	} finally {
		autoScroll();
	}
}

function autoScroll() {
	chatBox.scrollTo(0, chatBox.scrollHeight);
}

function handleChat() {
	userMessage = chatInput.value.trim();
	if (!userMessage) {
		return;
	}

	autoScroll();

	const outgoingMessageLi = createMessage(userMessage, "outgoing");
	addMessage(outgoingMessageLi);

	setTimeout(() => {
		const incomingMessageLi = createMessage("Typing...", "incoming");
		addMessage(incomingMessageLi);
		autoScroll();
		generateResponse(incomingMessageLi);
	}, 500);
}

sendBtn.addEventListener("click", handleChat);
