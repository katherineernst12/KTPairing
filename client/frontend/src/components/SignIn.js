import React, { Fragment, useState } from "react";
import './SignIn.css'; // Custom CSS for styling

const SignIn = ({ goToHomePage, handleSignIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear any previous error
    
        try {
            const response = await fetch("http://localhost:5000/logIn/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // Send both email and password in the body
            });
    
            // Log the response status and body for debugging
            console.log("Response Status:", response.status);
            
            // Handle response based on HTTP status code
            const data = await response.json();
            console.log("Response Data:", data);
    
            if (!response.ok) {
                // Display error message based on status
                setError(data.message || "Failed to sign in");
                throw new Error(data.message || "Failed to sign in");
            }
    
            // Call the handleSignIn function to pass the user data
            handleSignIn(data);
    
        } catch (err) {
            setError(err.message); // Set the error message
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };

    return (
        <Fragment>
            <div className="top-bar">
                Welcome back to KTPairing!
            </div>
            <button className="home-btn" onClick={goToHomePage}>
                Home
            </button>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow-lg p-5 rounded-4" style={{ width: '450px' }}>
                    <h2 className="text-center mb-4">Sign In</h2>
                    <form className="d-flex flex-column" onSubmit={onSubmitForm}>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default SignIn;