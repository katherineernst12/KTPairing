import React, { useState } from 'react';
import './App.css'; // Your main styles
import CreateUser from './components/CreateUser'; // CreateUser form
import HomePage from './components/HomePage'; // Homepage component
import SignIn from './components/SignIn'; // SignIn component
import LandingPage from './components/LandingPage'; // New LandingPage for logged-in users

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // State to track current page ("home", "createUser", "signIn", "landing")
  const [user, setUser] = useState(null); // State to track if the user is logged in

  const goToCreateUser = () => {
    setCurrentPage("createUser"); // Navigate to CreateUser page
  };

  const goToHomePage = () => {
    setCurrentPage("home"); // Navigate to HomePage
  };

  const goToSignInPage = () => {
    setCurrentPage("signIn"); // Navigate to SignIn page
  };

  const handleSignUpSuccess = (userData) => {
    setUser(userData); // Set the user data on successful sign-up
    setCurrentPage("landing"); // Navigate to the landing page after sign-up
  };

  const handleSignIn = (userData) => {
    setUser(userData); // Set the user data on successful sign-in
    setCurrentPage("landing"); // Show the landing page after sign-in
  };

  return (
    <div className="App">
      <div className="container">
        {/* Render the component based on currentPage */}
        {currentPage === "home" && <HomePage goToCreateUser={goToCreateUser} />}
        {currentPage === "createUser" && <CreateUser goToHomePage={goToHomePage} goToSignIn={goToSignInPage} handleSignUpSuccess={handleSignUpSuccess} />}
        {currentPage === "signIn" && <SignIn goToHomePage={goToHomePage} handleSignIn={handleSignIn} />}
        {currentPage === "landing" && user && <LandingPage user={user} />}
      </div>
    </div>
  );
}

export default App;