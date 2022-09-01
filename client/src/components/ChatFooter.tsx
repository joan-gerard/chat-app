import React, { useState } from "react";
import { Socket } from "socket.io-client";

type SocketProp = {
  socket: Socket;
  setTypingStatus: any;
};

const ChatFooter: React.FC<SocketProp> = ({ socket, setTypingStatus }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    console.log("is typing");
    socket.emit("send_typing", `${localStorage.getItem("userName")} is typing`);
  };
  // const handleIsDoneTyping = () => {
  //   console.log("I am done typing");
  //   socket.emit("send_isDoneTyping")
  // };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("send_message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    socket.emit("send_isDoneTyping")
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
          onKeyDown={handleTyping}
          // onKeyUp={() =>
          //   setTimeout(() => {
          //     handleIsDoneTyping();
          //   }, 5000)
          // }
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
