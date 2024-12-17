import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import './User.css';

const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = " http://localhost:3000/user";
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Handles input field changes
    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Set loading state

        try {
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({ name: "", email: "", phone: "" }); // Reset form after successful submission
                navigate('/show-user'); // Redirect to the show user page
            } else {
                const errorMessage = await response.text(); // Get the error message from response body
                console.error('Response error:', errorMessage);
                setError(`Failed to submit form. Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError(`An error occurred: ${error.message}`); // Set error message if the fetch fails
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader />} {/* Show loading indicator */}
                {error && <p className="error-message">{error}</p>} {/* Display error if any */}
                <p>User Form</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInput}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isLoading} // Disable button while loading
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
