// CLIENT CODE
// get socket variable from the server host location
const socket = io("http://localhost:4000");

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const userList = document.getElementById("user-list-container");
let activeUsers = new Set([]);

// BASIC USER SETUP - flesh this out later
const clientUsername = prompt("Please choose a username") || generateUsername();

// USERNAME GENERATOR
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
activeUsers.add(clientUsername);
addUserToRoomList();

socket.emit("user-joined", clientUsername);

// EMIT EVENTS
socket.on("chat-message", data => {
  appendMessage(`${data.username}: ${data.message}`);
});

socket.on("user-connected", username => {
  appendMessage(`${username} joined the room`);
  activeUsers.add(`${username}`);

  addUserToRoomList();
});

socket.on("user-disconnected", name => {
  appendMessage(`${name} left the room`);
  activeUsers.delete(`${name}`);

  addUserToRoomList();
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

function addUserToRoomList() {
  userList.innerHTML = "";

  for (let name of activeUsers) {
    let userElement = document.createElement("div");
    userElement.textContent = name;

    userList.appendChild(userElement);
  }

  //   userList.appendChild(userElement);
}
