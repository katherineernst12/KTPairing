// src/components/HomePage.js
import React from 'react';
import './HomePage.css'; // Ensure you import the custom CSS for styling

const HomePage = ({ goToCreateUser}) => {
  return (
    <div className="homepage-container">
      {/* Top Bar */}
      <div className="top-bar">
        Welcome to KTPairing
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to KTPairing!</h1>
        <p>KTPairing is your go-to platform on campus for finding someone with similar interests to 
            join you at date parties and mixers. Whether you're looking to meet a potential match or 
            just want to connect with someone new, KTPairing has you covered. Simply create an account, 
            answer a few questions, and let us work our magic to find your perfect pairing! 😊</p>

        {/* Go to Create User Button */}
        <button className="btn-signup" onClick={goToCreateUser}>
          Create an account
        </button>
        
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 KTPairing. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;