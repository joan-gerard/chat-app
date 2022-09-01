import React, { useState } from "react";
import { Socket } from "socket.io-client";

import { useNavigate } from "react-router-dom";

type SocketProp = {
  socket: Socket;
};

const Home: React.FC<SocketProp> = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("send_newUser", { userName, socketID: socket.id });
    navigate("/chat");
    socket.emit("send_entersChat", {
      text: `${userName} has entered the chat`,
      name: userName,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      socketNotif: true
    });
  };
  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("send_joinRoom", roomName);
    navigate(`/chat/${roomName}`);
  };
  return (
    <div className="home__container">
      <form onSubmit={handleSubmit}>
        <h2 className="home__header">Sign in to Open Chat</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          minLength={6}
          name="username"
          id="username"
          className="username__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="home__cta">SIGN IN</button>
      </form>
      <form onSubmit={handleJoinRoom}>
        <h2 className="home__header">Join Roon</h2>
        <label htmlFor="room">Name of room</label>
        <input
          type="text"
          minLength={4}
          name="room"
          id="room"
          className="room__input"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className="home__cta">JOIN</button>
      </form>
    </div>
  );
};

export default Home;
