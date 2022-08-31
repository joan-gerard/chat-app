import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type SocketProp = {
  socket: Socket;
};

const ChatBar: React.FC<SocketProp> = ({ socket }) => {
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    socket.on("receive_users", (data) => {
      console.log("receive_users", data);
      setUsers(data);
    });
  }, [socket, users]);

  console.log("USERS", users);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users?.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
