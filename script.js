// CLIENT CODE
// get socket variable from the server host location
const socket = io("http://localhost:4000");

socket.on("chat-message", data => {
  console.log(data);
});
