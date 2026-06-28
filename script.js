const API_URL = "https://drichdev-orni.hf.space";

const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const chat = document.getElementById("chat");
const modelSelect = document.getElementById("model-select");

form.onsubmit = async (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  if (prompt === "") return;

  chat.innerHTML += `<div class="user">${prompt}</div>`;
  input.value = "";

  const waiting = document.createElement("div");
  waiting.className = "assistant";
  waiting.innerHTML = `
    <div class="loading">
      <span class="loader"></span>
      <span>Thinking...</span>
    </div>
  `;
  chat.appendChild(waiting);
  window.scrollTo(0, document.body.scrollHeight);

  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, model: modelSelect.value }),
    });
    const data = await response.json();
    waiting.innerHTML = data.response;
  } catch (err) {
    waiting.innerHTML = "⚠️ Erreur de connexion au serveur.";
  }

  window.scrollTo(0, document.body.scrollHeight);
};

document.getElementById("clear").onclick = async () => {
  await fetch(`${API_URL}/clear`, { method: "POST" });
  chat.innerHTML = `<div class="assistant">Hello! How can I help you today?</div>`;
};