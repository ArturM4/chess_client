import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ChallengeFriend } from './components/ChallengeFriend';
import { CustomNav } from './components/CustomNav';
import { Game } from './components/Game';
import { Home } from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <CustomNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/challenge" element={<ChallengeFriend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
