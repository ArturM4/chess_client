import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CustomNav } from './components/CustomNav';
import { Game } from './components/Game';
import { Home } from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <CustomNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
