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
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("friendRequest", (request) => {
      setNotifications((prev) => [...prev, request])
    })

    return () => {
      socket.off('friendRequest')
    }
  }, []);

  return (
    <BrowserRouter>
      <CustomNav user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications} />
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
