import React, { useState } from "react";
import { Socket } from "socket.io-client";

type SocketProp = {
  socket: Socket;
};

const ChatFooter: React.FC<SocketProp> = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({
    //   userName: localStorage.getItem("userName"),
    //   message,
    //   socketId: socket.id,
    // });
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("send_message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
