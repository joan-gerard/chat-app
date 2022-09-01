import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

type SocketProp = {
  socket: Socket;
};

const ChatPage: React.FC<SocketProp> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState<string | null>(null);
  const lastMessageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessages([...messages, data]);
    });
    socket.on("receive_enterChat", (data: Message) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("receive_typing", (data: string) => {
      setTypingStatus(data);
    });
    socket.on("receive_isDoneTyping", () => {
      setTypingStatus(null);
    });
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
