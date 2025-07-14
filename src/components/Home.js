import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to BookAPI</h1>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/signup"><button style={{ marginLeft: '10px' }}>Signup</button></Link>
    </div>
  );
}

export default Home;