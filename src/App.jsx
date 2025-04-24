// src/App.jsx
import { useState, useEffect } from 'react';
import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';

function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/funding.json')
      .then(res => res.json())
      .then(setFundingData)
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  return (
    <div className="container">
      <h1>Startup Funding Tracker</h1>
      {fundingData.length
        ? <>
            <FundingBarChart data={fundingData} />
            <IndustryTrendChart data={fundingData} />
          </>
        : <p>Loading data…</p>
      }
    </div>
  );
}

export default App;
