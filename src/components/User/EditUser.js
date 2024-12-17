import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "http://localhost:3000/user";

  // Fetch user data when the component mounts
  useEffect(() => {
    getUser();
  }, [id]);

  // Function to fetch the user data by ID
  const getUser = () => {
    axios
      .get(`${getUserApi}/${id}`)
      .then((response) => {
        setUser(response.data); // Set fetched user data to state
      })
      .catch((err) => {
        setError("Error fetching user data.");
        console.error(err);
      });
  };

  // Handle changes to form inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission to update user details
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Sending the updated user data to the server
    fetch(`${getUserApi}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        navigate("/show-user"); // Redirect to the list of users after update
      })
      .catch((error) => {
        setError("Failed to update user.");
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />} {/* Show loader while loading */}
        {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
        <p>Edit User Form</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading}>
          {isLoading ? "Updating..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
