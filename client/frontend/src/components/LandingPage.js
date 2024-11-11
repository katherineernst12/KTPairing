import React from 'react';

const LandingPage = ({ user }) => {
  const handleJoinEvent = (event) => {
    // Handle event joining logic here (maybe redirect to event page, etc.)
    alert(`You joined: ${event}`);
  };

  return (
    <div className="landing-page">
      <h1>Welcome, {user.name}!</h1>
      <p>You're now logged in.</p>
      <div>
        <h2>Upcoming Events</h2>
        <ul>
          <li>
            Event 1: Music Concert
            <button onClick={() => handleJoinEvent('Music Concert')}>Join Event</button>
          </li>
          <li>
            Event 2: Tech Conference
            <button onClick={() => handleJoinEvent('Tech Conference')}>Join Event</button>
          </li>
          <li>
            Event 3: Charity Run
            <button onClick={() => handleJoinEvent('Charity Run')}>Join Event</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;