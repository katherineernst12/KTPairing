import React, { useState } from 'react';
import '../cssFolder/CreateEvent.css'; // Ensure correct path to your CSS file

const CreateEvent = ({ goToLandingPage }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPassword, setEventPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate || !eventDescription || !eventPassword) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const eventData = {
        eventName,
        eventDes: eventDescription,
        dateOfEvent: eventDate,
        eventPassword,
      };

      const response = await fetch('http://localhost:5000/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Event Created: ${eventName}`);
        console.log('Event created:', result);
        goToLandingPage();
      } else {
        setError(result.error || 'An error occurred while creating the event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-page">
        <div className="events-container">
          <div className="top-bar">Welcome to KTPairing!</div>
          <h1>Create a New Event</h1>
          <form>
            <div className="form-group">
              <label className="question">Event Name:</label>
              <input
                type="text"
                className="form-control"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="question">Event Date:</label>
              <input
                type="date"
                className="form-control"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="question">Event Description:</label>
              <textarea
                className="form-control description-box"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="question">Event Password:</label>
              <input
                type="password"
                className="form-control"
                value={eventPassword}
                onChange={(e) => setEventPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="button"
              className="create-event-btn"
              onClick={handleCreateEvent}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
          <button type="button" onClick={goToLandingPage} className="go-back-btn">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;