import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:3000';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';

    try {
      const res = await axios.post(`${API}${endpoint}`, { username, password });
      setMessage(res.data.message);
      if (isLogin) {
        localStorage.setItem('username', username);
        navigate('/chat');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="app">
      <div className="box user-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required /><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><br />
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        <p>{message}</p>
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '10px' }}>
          {isLogin ? 'New here? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
