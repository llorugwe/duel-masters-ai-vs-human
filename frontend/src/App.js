import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CombinedAuth from './components/CombinedAuth';
import GameInterface from './components/GameInterface';
import ChooseOpponent from './components/ChooseOpponent';
import Leaderboard from './components/Leaderboard'; // Import the Leaderboard component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CombinedAuth />} />
          <Route path="/choose-opponent" element={<ChooseOpponent />} />
          <Route path="/game-interface" element={<GameInterface />} />
        </Routes>
        <Leaderboard /> {/* Add the Leaderboard component here */}
      </div>
    </Router>
  );
}

export default App;
