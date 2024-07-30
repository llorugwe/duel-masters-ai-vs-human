import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CombinedAuth.css';

const CombinedAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('playerName', res.data.name); // Store player's name
        setMessage('Login successful');
        navigate('/choose-opponent'); // Navigate to opponent selection
      } else {
        await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        localStorage.setItem('playerName', name); // Store player's name
        setMessage('Registration successful');
      }
    } catch (err) {
      setMessage(err.response.data.msg || 'Error: Request failed with status code ' + err.response.status);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to Duel Masters: AI vs. Human</h2>
        <p>Embark on an epic battle between artificial intelligence and human intellect. Log in or register to join the adventure!</p>
        <h3>{isLogin ? 'Login' : 'Register'}</h3>
        <form onSubmit={onSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={onChange} required={!isLogin} />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={onChange} required />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>{message}</p>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default CombinedAuth;
