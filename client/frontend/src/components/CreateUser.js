
import React, { Fragment, useState } from "react";
import '../cssFolder/CreateUser.css'; // Custom CSS for styling

const CreateUser = ({ goToHomePage, goToSignIn, handleSignUpSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const body = { email, password };

        try {
            const response = await fetch("http://localhost:5000/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const data = await response.json();
            console.log(data);

            // On success, navigate to the LandingPage
            handleSignUpSuccess(data);  // Pass user data to LandingPage
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="top-bar">
                Welcome to KTPairing!
            </div>
            <button className="home-btn" onClick={goToHomePage}>
                Home
            </button>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow-lg p-5 rounded-4" style={{ width: '450px' }}>
                    <h2 className="text-center mb-4">Create an Account</h2>
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
                        {/* Sign In Button */}
                        <button
                            type="button"
                            className="btn btn-link w-100 mt-3"
                            onClick={goToSignIn}
                        >
                            Already have an account? Sign In
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default CreateUser;