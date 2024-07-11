import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CombinedAuth from './components/CombinedAuth';
import GameInterface from './components/GameInterface';
import ChooseOpponent from './components/ChooseOpponent';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CombinedAuth />} />
          <Route path="/choose-opponent" element={<ChooseOpponent />} />
          <Route path="/game-interface" element={<GameInterface />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
