import React, { useState } from 'react';

const CreateEvent = ({ goToLandingPage }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPassword, setEventPassword] = useState('');

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate || !eventDescription || !eventPassword) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Data to send to the server
      const eventData = {
        eventName,
        eventDes: eventDescription, // Backend expects 'eventDes'
        dateOfEvent: eventDate,
        eventPassword,
      };

      // Send the POST request to the backend
      const response = await fetch('http://localhost:5000/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure JSON format
        },
        body: JSON.stringify(eventData), // Stringify the data
      });

      // Handle the server response
      const result = await response.json(); // Parse the JSON response

      if (response.ok) {
        // Success
        alert(`Event Created: ${eventName}`);
        console.log('Event created:', result); // Log the event ID and message
        goToLandingPage(); // Navigate back to the landing page
      } else {
        // Error from the server
        alert(result.error || 'An error occurred while creating the event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <div className="create-event-page">
      <div className="top-bar">
          Welcome to KTPairing!
      </div>
      <h1>Create a New Event</h1>
      <form>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Password:</label>
          <input
            type="password"
            value={eventPassword}
            onChange={(e) => setEventPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
      </form>

      {/* Go Back Button */}
      <button type="button" onClick={goToLandingPage} className="go-back-btn">
        Go Back
      </button>
    </div>
  );
};

export default CreateEvent;