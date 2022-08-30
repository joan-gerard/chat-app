import React from "react";
import { Socket } from "socket.io-client";

import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
// import ChatBar from './ChatBar';
// import ChatBody from './ChatBody';
// import ChatFooter from './ChatFooter';

type SocketProp = {
  socket: Socket;
};

const ChatPage: React.FC<SocketProp> = ({ socket }) => {
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
