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

  socket.on("send_message", (data) => {
    socketIO.emit("receive_message", data);
  });

  // listens to new user
  socket.on("send_newUser", (data) => {
    // adds new user to list of users
    users.push(data);
    console.log('the users in index', users);
    // send lists of users to client
    socketIO.emit("receive_users", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    // updates users when a user disconnects
    users = users.filter((user) => {
      user.socketID !== socket.id;
    });
    // send updated users to client
    socketIO.emit("receive_users", users);
    socket.disconnect()
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
