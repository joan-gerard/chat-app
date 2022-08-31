import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

type SocketProp = {
  socket: Socket;
};

const ChatPage: React.FC<SocketProp> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      console.log("receive_message", data);
      setMessages([...messages, data]);
    });
  }, [socket, messages]);


  console.log("messages", messages);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
