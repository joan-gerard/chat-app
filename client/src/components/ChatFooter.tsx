import React, { useState } from "react";
import { Socket } from "socket.io-client";

type SocketProp = {
  socket: Socket;
};

const ChatFooter: React.FC<SocketProp> = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
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
