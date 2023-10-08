import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import UserData from './UserData';
import ProblemRecommendations from './ProblemRecommendations';
import PieChart from './PieChart';

function App() {
  const [userHandle, setUserHandle] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const [userData, setUserData] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [barChartData, setBarChartData] = useState(null);

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

  const Clicked = () => {
    setButtonClicked(false);
    setButtonClicked(true);
  };

  // Rest of your code for calculating barChartData and displaying it goes here

  return (
    <div className="App">
      <h1>Codeforces Problem Recommender</h1>
      <div className="user-input">
        <input
          type="text"
          placeholder="Enter your Codeforces user handle"
          value={userHandle}
          onChange={(e) => {setUserHandle(e.target.value);
            setButtonClicked(false);}}
        />
        <button onClick={Clicked}>Search</button>
      </div>
      {buttonClicked && <UserData userHandle={userHandle} />}
      
      <div className="side-by-side-container">
        {/* First component */}
        <div className="side-by-side-item">
       
        {buttonClicked && <PieChart userHandle={userHandle} />}
        </div>

        {/* Second component */}
        <div className="side-by-side-item">
         {/* {buttonClicked && <ProblemRecommendations userHandle={userHandle} />} */}
        </div>

        {/* Third component */}
        <div className="side-by-side-item">
        {/* {buttonClicked && <ProblemRecommendations userHandle={userHandle} />} */}
        </div>
      </div>
    </div>
  );
}

export default App;
