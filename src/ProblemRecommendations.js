// ProblemRecommendations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function ProblemRecommendations({ userHandle }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [leetCodeData, setLeetCodeData] = useState(null);
    useEffect(() => {
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

    const options = {
        method: 'GET',
  url: 'https://leetcode-api1.p.rapidapi.com/cpcs',
  headers: {
    'X-RapidAPI-Key': '9a3ad2efe3mshe59257e07b13430p15e6f8jsn232cf3fe9690',
    'X-RapidAPI-Host': 'leetcode-api1.p.rapidapi.com'
  }
    };

    const fetchLeetCodeData = async () => {
        try {
          // Fetch LeetCode user data using the user handle (username or user ID)
          const response = axios.request(options);
          const leetCodeData = response.data;
          setLeetCodeData(leetCodeData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching LeetCode data:', error);
          setIsLoading(false);
        }
      };
  
      if (userHandle) {
        fetchLeetCodeData();
        console.log(leetCodeData);
        // fetchUserSubmissions();
      }
    }, [userHandle]);
  return (
    <div>
      {!isLoading ? (
        <div>
          {/* <h2>User Submissions</h2> */}
          {leetCodeData && (
        <div className="leetCode-data">
          <h2>LeetCode Data</h2>
          <p>
            <strong>Username:</strong> {leetCodeData.username}
          </p>
          <p>
            <strong>Solved Questions:</strong> {leetCodeData.solved_question_count}
          </p>
          {/* Add more LeetCode data fields as needed */}
        </div>
      )}
        </div>
      ) : (
        <p>Loading user submissions...</p>
      )
}

    </div>
  );
}

export default ProblemRecommendations;
