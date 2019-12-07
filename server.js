// to start up a server, we only need to pass the port to the socket instance, at minimum
const io = require("socket.io")(4000);

io.on("connection", socket => {
  // when a user connects, we emit the 'chat message' and pass along the data payload we want to send down to the client
  console.log("new user connected");
  socket.emit("chat-message", "Hello World");
});
