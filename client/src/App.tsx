import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import "./App.css";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";

// const socket = io('http://localhost:4000');
const socket = io("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/chat/:roomName" element={<RoomPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
