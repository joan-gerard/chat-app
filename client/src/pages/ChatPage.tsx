import React from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
// import ChatBar from './ChatBar';
// import ChatBody from './ChatBody';
// import ChatFooter from './ChatFooter';

const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPage;