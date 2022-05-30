import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ChallengeFriend } from './pages/ChallengeFriend';
import { CustomNav } from './components/CustomNav';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Friends } from './pages/Friends';
import socket from './socket/socket';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on("friendRequest", (request) => {
      console.log('friend request', request)
      alert(`${request.senderUsername} t'ha enviat una sol·licitud d'amistat`)
    })

    return () => {
      socket.off('friendRequest')
    }
  }, []);

  return (
    <BrowserRouter>
      <CustomNav user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/challenge" element={<ChallengeFriend user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/friends" element={<Friends user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
