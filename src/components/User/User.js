import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState(null); // Initialize as null instead of an empty array
  const [error, setError] = useState(null); // State for error handling
  const { id } = useParams();
  const getUserApi = "http://localhost:3000/user";

  const getUser = useCallback(() => {
    axios
      .get(`${getUserApi}/${id}`)
      .then((response) => {
        setUser(response.data);
        setError(null); // Reset error state on successful data fetch
      })
      .catch((err) => {
        setError("User not found or an error occurred.");
        console.log(err); // Log error to the console for debugging
      });
  }, [id]); // Only recreate the function when 'id' changes

  useEffect(() => {
    getUser();
  }, [id, getUser]); // Add 'getUser' to the dependency array

  // Display a loading message or spinner while the data is being fetched
  if (user === null && error === null) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  // If there was an error fetching the user data
  if (error) {
    return <div>{error}</div>;
  }

  // When user data is available, render the table
  return (
    <div className="user mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditUser;
