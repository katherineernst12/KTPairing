import React, { useState } from 'react';
import './App.css'; // Your main styles
import CreateUser from './components/CreateUser'; // CreateUser form
import HomePage from './components/HomePage'; // Homepage component
import SignIn from './components/SignIn'; // SignIn component
import LandingPage from './components/LandingPage'; // LandingPage for logged-in users
import CreateEvent from './components/CreateEvent'; // CreateEvent component

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // Track current page
  const [user, setUser] = useState(null); // Track logged-in user

  const goToCreateUser = () => {
    setCurrentPage("createUser");
  };

  const goToHomePage = () => {
    setCurrentPage("home");
  };

  const goToSignInPage = () => {
    setCurrentPage("signIn");
  };

  const handleSignUpSuccess = (userData) => {
    setUser(userData); 
    setCurrentPage("landing"); // Navigate to Landing Page after sign-up
  };

  const handleSignIn = (userData) => {
    setUser(userData);
    setCurrentPage("landing"); // Show the Landing Page after sign-in
  };

  const navigateToCreateEvent = () => {
    setCurrentPage("createEvent"); // Navigate to Create Event page
  };

  const navigateBackToLandingPage = () => {
    setCurrentPage("landing"); // Go back to the Landing Page
  };

  return (
    <div className="App">
      <div className="container">
        {/* Render the component based on currentPage */}
        {currentPage === "home" && <HomePage goToCreateUser={goToCreateUser} />}
        {currentPage === "createUser" && <CreateUser goToHomePage={goToHomePage} goToSignIn={goToSignInPage} handleSignUpSuccess={handleSignUpSuccess} />}
        {currentPage === "signIn" && <SignIn goToHomePage={goToHomePage} handleSignIn={handleSignIn} />}
        {currentPage === "landing" && user && <LandingPage user={user} navigateToCreateEvent={navigateToCreateEvent} />}
        {currentPage === "createEvent" && <CreateEvent goToLandingPage={navigateBackToLandingPage} />}
      </div>
    </div>
  );
}

export default App;