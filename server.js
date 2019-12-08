// to start up a server, we only need to pass the port to the socket instance, at minimum
const io = require("socket.io")(4000);

// key of object is the socket id
let users = {};

io.on("connection", socket => {
  // when a user connects, we emit the 'chat message' and pass along the data payload we want to send down to the client
  socket.on("user-joined", username => {
    users[socket.id] = username;

    socket.broadcast.emit("user-connected", username);
  });

  //   receive chat messages
  socket.on("send-chat-message", message => {
    //   broadcast sends to all other sockets except your own - we'll send the message to everyone else
    socket.broadcast.emit("chat-message", {
      message: message,
      username: users[socket.id]
    });
  });

  //   user disconnects
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
