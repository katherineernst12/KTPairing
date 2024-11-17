import React, { useState, useEffect } from "react";
import '../cssFolder/LandingPage.css'; // Your CSS for LandingPage
import Modal from "./Modal"; // Import the Modal component

const LandingPage = ({ user, navigateToCreateEvent }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // Error state for displaying errors
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
    const [modalMessage, setModalMessage] = useState(""); // Modal message state

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
                setError("Failed to fetch events");
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
                setModalMessage(result.message); // Set success message
                setIsModalOpen(true); // Open the modal
            } else if (result.error === "User already joined the event") {
                setModalMessage("You have already joined this event!"); // Set error message
                setIsModalOpen(true); // Open the modal
            } else {
                setModalMessage(result.error || "Error joining event");
                setIsModalOpen(true); // Open the modal
            }
        } catch (err) {
            console.error('Error joining event:', err);
            setModalMessage("Error joining event");
            setIsModalOpen(true); // Open the modal
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div className="landing-page-container">
            <div className="top-bar">
                Welcome to KTPairing! {user && `Logged in as: ${user.email}`} {/* Display email */}
            </div>

            <div className="events-container card">
                <h2>Upcoming Events</h2>
                <ul>
                    {events.map((event) => (
                        <li key={event.event_id} className="event-item">
                            <div className="icon">E</div> {/* Placeholder icon */}
                            <div className="event-details">
                                <strong>{event.eventname}</strong>
                                <p>{event.eventdes}</p>
                                <p className="date">{new Date(event.dateofevent).toLocaleDateString()}</p>
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

            {/* Modal for feedback */}
            <Modal 
                isOpen={isModalOpen} 
                message={modalMessage} 
                onClose={() => setIsModalOpen(false)} // Close modal when clicked
            />
        </div>
    );
};

export default LandingPage;