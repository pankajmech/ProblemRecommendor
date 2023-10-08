import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgChartsReact } from 'ag-charts-react';
import { saveAs } from 'file-saver';

function PieChart({ userHandle }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userSubmissions, setUserSubmissions] = useState([]);

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

    if (userHandle) {
      fetchUserSubmissions();
    }
  }, [userHandle]);

  // Calculate the count of solved problems for each tag
  const calculatePieData = () => {
    const tagData = {};
    const problems = [];

    userSubmissions.forEach((submission) => {
      if (submission.verdict === 'OK') {
        const { problem } = submission;
        const problemId = problem.contestId + problem.index;
        problems.push({ problemId, tags: problem.tags, contestId: problem.contestId });

        submission.problem.tags.forEach((tag) => {
          tagData[tag] = (tagData[tag] || 0) + 1;
        });
      }
    });

    return { tagData, problems };
  };


  const fetchAllProblems = async () => {
    try {
      const all_response = await axios.get(`https://codeforces.com/api/problemset.problems`);
      const all_problems = all_response.data.result.problems;
    //   const problems_all = []
    //   all_problems.forEach((problem) => {
    //     const problemId = problem.contestId + problem.index;
    //     problems_all.push({ problemId, tags: problem.tags, contestId: problem.contestId });
    //   });
    console.log(all_problems);
      return all_problems;
    } catch (error) {
      console.error('Error fetching problems:', error);
      throw error;
    }
  };

  const saveProblemsToCSV = () => {
    const { problems } = calculatePieData();
    const all_problems = fetchAllProblems()
    console.log(problems);
    console.log(all_problems);
    // Convert the data to CSV format
    let csvContent = 'Problem ID,Tags,Contest ID\n';
    let csvContent_1 = 'Problem ID,Tags,Contest ID\n';

problems.forEach((problem) => {
  const { problemId, tags, contestId } = problem;
  const row = `${problemId},"${tags.join(',')}",${contestId}\n`;
  csvContent += row;
});
// all_problems.forEach((problem) => {
//     const { problemId, tags, contestId } = problem;
//     const row = `${problemId},"${tags.join(',')}",${contestId}\n`;
//     csvContent_1 += row;
//   });

// Create a Blob object with the CSV content
const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
const blob_1 = new Blob([csvContent_1], { type: 'text/csv;charset=utf-8' });
// Use file-saver to trigger the download
saveAs(blob, 'problems.csv');
saveAs(blob_1, 'all_problems.csv');
  };


  
  
  // Example usage:
  fetchAllProblems()
    .then((all_problems) => {
      console.log('Fetched problems:', all_problems);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  // Convert tag data for the pie chart
  const { tagData } = calculatePieData();
  saveProblemsToCSV();
//   console.log(problems);
  const pieData = Object.entries(tagData).map(([tag, count]) => ({
    label: tag,
    value: count,
  }));

  // Debug: Check if pieData is correctly populated
  console.log('Pie Data:', pieData);

  const pieConfig = {
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        labelKey: 'label',
        calloutLabelKey: 'label',
        sectorLabelKey: 'value',
        title: {
          text: 'Problem Tags', // Add a title if needed
        },
      },
    ],
    data: pieData, // Use the pieData for the chart data
  };

  // Debug: Check if data and options are correctly configured
  console.log('Options:', pieConfig);

  return (
    <div>
      {!isLoading ? (
        <div>
          <h2>User Submissions - Pie Chart</h2>
          <div style={{ height: '400px' }}>
            <AgChartsReact options={pieConfig} />
          </div>
        </div>
      ) : (
        <p>Loading user submissions...</p>
      )}
    </div>
  );
}

export default PieChart;
