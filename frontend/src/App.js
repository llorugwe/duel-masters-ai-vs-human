import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CombinedAuth from './components/CombinedAuth';
import GameInterface from './components/GameInterface';
import OpponentSelection from './components/OpponentSelection';
import Leaderboard from './components/Leaderboard'; // Import the Leaderboard component
import Game from './components/Game'; // Import the Game component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CombinedAuth />} />
          <Route path="/choose-opponent" element={<OpponentSelection />} />
          <Route path="/game-interface" element={<GameInterface />} />
          <Route path="/game" element={<Game />} /> {/* Add route for Game component */}
        </Routes>
        <Leaderboard /> {/* Add the Leaderboard component here */}
      </div>
    </Router>
  );
}

export default App;
