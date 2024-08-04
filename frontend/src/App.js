// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/data')
      .then(response => {
        console.log('Fetched data:', response.data); // Log fetched data
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      {data.length > 0 ? <BarChart data={data} /> : <p>Loading data...</p>}
    </div>
  );
};

export default App;
