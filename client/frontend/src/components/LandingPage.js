import React, { useState, useEffect } from 'react';
import '../cssFolder/LandingPage.css'; // Assuming you'll create a separate CSS file for styles

const LandingPage = ({ user, navigateToCreateEvent }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/showEvents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched events:', data);
        setEvents(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchEvents();
  }, []);

  const handleJoinEvent = (event) => {
    // Handle event joining logic here (maybe redirect to event page, etc.)
    alert(`You joined: ${event.eventname}`); // Use 'eventname' from the data
  };

  if (loading) {
    return <div>Loading events...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

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
          {events.map((event) => (
            <li key={event.event_id} className="event-item">
              <div>
                <strong>{event.eventname}</strong> {/* Use 'eventname' */}
                <p>{event.eventdes}</p> {/* Use 'eventdes' */}
              </div>
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