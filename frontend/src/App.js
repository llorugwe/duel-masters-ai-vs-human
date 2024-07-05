import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameSession from './components/GameSession';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game-sessions" element={<GameSession />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
