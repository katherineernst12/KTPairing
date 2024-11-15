import React from 'react';
import '../cssFolder/LandingPage.css'; // Assuming you'll create a separate CSS file for styles

const LandingPage = ({ user, navigateToCreateEvent }) => {
  // Static events array (no need for setEvents)
  const events = [
    'Music Concert',
    'Tech Conference',
    'Charity Run',
  ];

  const handleJoinEvent = (event) => {
    // Handle event joining logic here (maybe redirect to event page, etc.)
    alert(`You joined: ${event}`);
  };

  return (
    <div className="landing-page">
      {/* Blue Banner at the top */}
      <div className="top-bar">
        Welcome to KTPairing!
      </div>

      {/* Event Listing Section */}
      <div className="events-container card">
        <h2>Upcoming Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              {event}
              <button className="join-btn" onClick={() => handleJoinEvent(event)}>
                Join Event
              </button>
            </li>
          ))}
        </ul>

        {/* Button to go to create event page */}
        <button className="add-event-btn" onClick={navigateToCreateEvent}>
          Create Event
        </button>
      </div>
    </div>
  );
};

export default LandingPage;