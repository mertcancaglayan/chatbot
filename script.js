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
        <p>
        ${message}
        </p>`;
	};

    addMessage(chatLi);
}

function handleChat() {
	userMessage = chatInput.value.trim();
	if (!userMessage) {
		return;
	}

	createMessage(userMessage, "outgoing");
}

sendBtn.addEventListener("click", handleChat);
