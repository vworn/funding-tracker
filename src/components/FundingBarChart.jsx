// src/components/FundingBarChart.jsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FundingBarChart({ data }) {
  // aggregate total by year
  const totals = data.reduce((acc, { year, amount }) => {
    acc[year] = (acc[year] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(totals).sort();
  const values = labels.map(y => totals[y]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Funding',
        data: values,
        backgroundColor: 'rgba(75,192,192,0.5)'
      }
    ]
  };

  return <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Total Funding by Year' } } }} />;
}

//create FundingBarChart component