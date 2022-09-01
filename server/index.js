const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

//--- socket.io START ---//
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('send_entersChat', data => {
    socketIO.emit("receive_enterChat", data);
  })
  socket.on("send_message", (data) => {
    socketIO.emit("receive_message", data);
  });

  socket.on("send_joinRoom", (data) => {
    socket.join(data);
  });

  // listens to new user
  socket.on("send_newUser", (data) => {
    users.push(data);
    socketIO.emit("receive_users", users);
  });

  socket.on("send_typing", (data) => {
    socket.broadcast.emit("receive_typing", data);
  });
  socket.on("send_isDoneTyping", () => {
    socket.broadcast.emit("receive_isDoneTyping");
  });

  socket.on("disconnect", () => {
    console.log(`🔥: A user (${socket.id}) disconnected`);

    // updates users when a user disconnects
    users = users.filter((user) => {
      return user.socketID !== socket.id;
    });
    // send updated users to client
    socketIO.emit("receive_users", users);
    socket.disconnect();
  });
});
//--- socket.io END ---//

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// change app.listen to http.listen
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// notes
// socketIO.emit -> everybody
// socket.emit -> for the user only
// socket.broadcast.emit -> everyone but user
