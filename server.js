// to start up a server, we only need to pass the port to the socket instance, at minimum
const io = require("socket.io")(4000);

io.on("connection", socket => {
  // when a user connects, we emit the 'chat message' and pass along the data payload we want to send down to the client
  socket.emit("chat-message", "Hello World");

  //   receive chat messages
  socket.on("send-chat-message", message => {
    //   broadcast sends to all other sockets except your own - we'll send the message to everyone else
    socket.broadcast.emit("chat-message", message);
  });
});
