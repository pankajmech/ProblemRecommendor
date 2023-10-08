import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserData({ userHandle }) {
  const [userData, setUserData] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from Codeforces using the user handle
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${userHandle}`);
        const userData = response.data.result[0];
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserSubmissions = async () => {
      try {
        // Fetch user submissions from Codeforces using the user handle
        const response = await axios.get(`https://codeforces.com/api/user.status?handle=${userHandle}`);
        const userSubmissions = response.data.result;
        setUserSubmissions(userSubmissions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user submissions:', error);
        setIsLoading(false);
      }
    };

    if (userHandle) {
      fetchUserData();
      fetchUserSubmissions();
    }
  }, [userHandle]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Data</h2>
          <p><strong>Handle:</strong> {userData.handle}</p>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Rating:</strong> {userData.rating || 'N/A'}</p>
          <p><strong>Max Rating:</strong> {userData.maxRating || 'N/A'}</p>
          <p><strong>Country:</strong> {userData.country || 'N/A'}</p>
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}

      {/* {!isLoading ? (
        <div>
          <h2>User Submissions</h2>
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Verdict</th>
                <th>Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {userSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.problem.name}</td>
                  <td>{submission.verdict}</td>
                  <td>{new Date(submission.creationTimeSeconds * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user submissions...</p>
      )} */}
    </div>
  );
}

export default UserData;
