import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CustomNav } from './components/CustomNav';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Friends } from './pages/Friends';
import socket from './socket/socket';
import { GameWrapper } from './pages/GameWrapper';
import { ComputerGame } from './pages/ComputerGame';
import { Ranking } from './pages/Ranking';

function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [voiceControl, setVoiceControl] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("friendRequest", (request) => {
      setNotifications((prev) => [...prev, request])
    })

    socket.on("challengeFriend", (request) => {
      setNotifications((prev) => [...prev, request])
    })

    return () => {
      socket.off('challengeFriend')
      socket.off('friendRequest')
    }
  }, []);

  useEffect(() => {
    socket.on("gameCreated", (gameId) => {
      navigate('/game/' + gameId)
    })
    return () => {
      socket.off('gameCreated')
    }
  }, [navigate]);

  return (
    <>
      <CustomNav user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications} />
      <Routes>
        <Route path="/" element={<Home voiceControl={voiceControl} setVoiceControl={setVoiceControl} />} />
        <Route path="/game/:id" element={<GameWrapper voiceControl={voiceControl} setVoiceControl={setVoiceControl} />} />
        <Route path="/game/" element={<ComputerGame voiceControl={voiceControl} setVoiceControl={setVoiceControl} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/friends" element={<Friends user={user} />} />
        <Route path="/ranking" element={<Ranking user={user} />} />
      </Routes>
    </>
  );
}

export default App;
