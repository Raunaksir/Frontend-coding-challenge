import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Form.css';


function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', user);
      alert(response.data);
      localStorage.setItem('username', user.username);
      navigate('/books');
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;