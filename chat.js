// chat.js - Esqueleto para conectar con backend IA (debes implementar backend)

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage('user', message);
  chatInput.value = '';
  chatInput.disabled = true;

  try {
    // Aquí llama a tu backend API (ejemplo con fetch)
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data && data.reply) {
      addMessage('bot', data.reply);
    } else {
      addMessage('bot', 'Lo siento, no pude procesar tu solicitud.');
    }
  } catch (error) {
  addMessage('bot', 'Error al conectar con el servidor.');
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});

function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
