import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('/signup', user);
      alert(response.data);
      navigate('/login');
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
      <br /><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;