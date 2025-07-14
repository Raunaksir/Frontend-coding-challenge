import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // ✅ Import CSS

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>📚 Welcome to BookAPI</h1>
      <p>Manage your books collection with ease.</p>
      <div className="btn-group">
        <button className="landing-btn" onClick={() => navigate('/login')}>Login</button>
        <button className="landing-btn" onClick={() => navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
}

export default LandingPage;
