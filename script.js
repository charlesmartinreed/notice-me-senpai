// CLIENT CODE
// get socket variable from the server host location
const socket = io("http://localhost:4000");

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

// BASIC USER SETUP - flesh this out later
const username = prompt("Please choose a username") || generateUsername();
console.log(username, typeof username);

function generateUsername() {
  let adjectives = [
    "Timid",
    "Hasty",
    "Adamant",
    "Bold",
    "Hasty",
    "Quiet",
    "Quirky",
    "Rash",
    "Lonely",
    "Jolly",
    "Bashful",
    "Sassy"
  ];
  let nouns = [
    "Ninetales",
    "Weavile",
    "Popplio",
    "Bidoof",
    "Dunsparce",
    "Gliscor",
    "Gogoat",
    "Xerneas",
    "Donphan",
    "Mudbray",
    "Mimikyu",
    "Volcarona",
    "Lugia",
    "Umbreon"
  ];

  let randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  let randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

appendMessage("You joined the room");
socket.emit("new-user", username);

socket.on("chat-message", data => {
  appendMessage(`${data.username}: ${data.message}`);
});

socket.on("user-connected", data => {
  appendMessage(`${data} joined the room`);
});

messageForm.addEventListener("submit", e => {
  // we need to prevent the default submit action so that we don't lose our chat messages when the page refreshes.
  e.preventDefault();

  //   grab the message
  const message = messageInput.value;

  //   send from client to server
  socket.emit("send-chat-message", message);

  //   clear the input field
  messageInput.value = "";

  appendMessage(`You: ${message}`);
});

function appendMessage(msg) {
  const messageElement = document.createElement("div");
  messageElement.textContent = msg;
  messageContainer.appendChild(messageElement);
}
