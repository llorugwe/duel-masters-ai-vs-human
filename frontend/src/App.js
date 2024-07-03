import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import GameInterface from './components/GameInterface';
import Leaderboard from './components/Leaderboard';
import GameSessionHistory from './components/GameSessionHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<GameInterface />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/history" element={<GameSessionHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


