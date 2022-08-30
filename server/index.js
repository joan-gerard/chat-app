const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

//--- socket.io START ---//
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});
//--- socket.io END ---//


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

// change app.listen to http.listen
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});