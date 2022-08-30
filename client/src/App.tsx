import './App.css';
import io from 'socket.io-client';
io('http://localhost:4000');

function App() {
  return (
    <div className="App">
      <p>Hi</p>
    </div>
  );
}

export default App;
