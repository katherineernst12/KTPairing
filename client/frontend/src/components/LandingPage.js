import React, { useState, useEffect } from "react";
import '../cssFolder/LandingPage.css'; // Your CSS for LandingPage

const LandingPage = ({ user, navigateToCreateEvent }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/showEvents');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleJoinEvent = async (event_id) => {
        const email = user.email; // Get logged-in user's email
        try {
            const response = await fetch('http://localhost:5000/joinEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, event_id }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message); // User joined successfully
            } else {
                alert(result.error); // Error joining event
            }
        } catch (err) {
            console.error('Error joining event:', err);
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="landing-page">
            <div className="top-bar">
                Welcome to KTPairing! {user && `Logged in as: ${user.email}`} {/* Display email */}
            </div>

            <div className="events-container card">
                <h2>Upcoming Events</h2>
                <ul>
                    {events.map((event) => (
                        <li key={event.event_id} className="event-item">
                            <div>
                                <strong>{event.eventname}</strong>
                                <p>{event.eventdes}</p>
                            </div>
                            <button 
                                className="join-btn"
                                onClick={() => handleJoinEvent(event.event_id)} // Pass event_id when joining
                            >
                                Join Event
                            </button>
                        </li>
                    ))}
                </ul>

                <button className="add-event-btn" onClick={navigateToCreateEvent}>
                    Create Event
                </button>
            </div>
        </div>
    );
};

export default LandingPage;