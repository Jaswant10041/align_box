// Format time to match the design (e.g., "11:35 AM")
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

const socket = io('http://localhost:3002', {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('connect', () => {
  console.log('Connected to server');
});
const messagesEl = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const anonToggle = document.getElementById("anonToggle");

let userName = "You";
let anonymous = false;
let clientId = `client_${Math.random().toString(36).substr(2, 9)}`;
const groupId = 1;

// Join group
socket.on("connect", () => socket.emit("join_group", groupId));

// Toggle anonymous
anonToggle.addEventListener("click", () => {
  anonymous = !anonymous;
  anonToggle.classList.toggle("active", anonymous);
  document.getElementById("anonBanner").classList.toggle("hidden", !anonymous);
});

// Load previous messages
async function loadMessages() {
  const res = await fetch(`/api/messages?group_id=${groupId}`);
  const messages = await res.json();
  messages.forEach(addMessageToDOM);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Add message to DOM
function addMessageToDOM(msg) {
  const row = document.createElement("div");
  row.classList.add(
    "message-row",
    msg.client_id === clientId ? "message-right" : "message-left"
  );

  if (msg.client_id !== clientId) {
    const avatar = document.createElement("img");
    avatar.src = "https://ui-avatars.com/api/?name=" + msg.user_name + "&background=random";
    avatar.className = "msg-avatar";
    row.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className =
    "bubble " + (msg.client_id === clientId ? "bubble-right" : "bubble-left");
  bubble.innerHTML = `
    ${msg.anonymous ? "" : `<div class="name-tag">${msg.user_name}</div>`}
    ${msg.text}
    <span class="msg-meta">${formatTime(msg.created_at)}</span>
  `;
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Send message
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  socket.emit("send_message", {
    group_id: groupId,
    client_id: clientId,
    user_name: userName,
    anonymous: anonymous ? 1 : 0,
    text,
  });
  input.value = "";
});

// Receive message
socket.on("message", addMessageToDOM);

// Initial load
loadMessages();
