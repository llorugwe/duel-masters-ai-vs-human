
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import GameInterface from './components/GameInterface';
import GameSessions from './components/GameSessions';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game-interface" element={<GameInterface />} />
          <Route path="/game-sessions" element={<GameSessions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
