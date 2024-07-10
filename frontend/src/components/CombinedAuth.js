import React, { useState } from 'react';
import axios from 'axios';
import './CombinedAuth.css';

const CombinedAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
        localStorage.setItem('token', res.data.token);
        setMessage('Login successful');
      } else {
        await axios.post('http://localhost:5000/api/auth/register', {
          name,
          email,
          password,
        });
        setMessage('Registration successful');
      }
    } catch (err) {
      setMessage(
        err.response.data.message ||
          'Error: Request failed with status code ' + err.response.status
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={onSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
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
