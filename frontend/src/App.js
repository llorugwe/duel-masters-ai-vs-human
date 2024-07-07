
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import GameSessions from './components/GameSessions';
import GameInterface from './components/GameInterface';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" exact element={<Home />} /> {/* Use element instead of component */}
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game-sessions" element={<GameSessions />} />
          <Route path="/game-interface" element={<GameInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
