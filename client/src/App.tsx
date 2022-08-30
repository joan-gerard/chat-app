import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as io from "socket.io-client";

import "./App.css";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";

// const socket = io('http://localhost:4000');
const socket = io.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
