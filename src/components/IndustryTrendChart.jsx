// src/components/IndustryTrendChart.jsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function IndustryTrendChart({ data }) {
  // group by industry → year → amount sum
  const grouped = data.reduce((acc, { industry, year, amount }) => {
    acc[industry] = acc[industry] || {};
    acc[industry][year] = (acc[industry][year] || 0) + amount;
    return acc;
  }, {});

  const allYears = [...new Set(data.map(d => d.year))].sort();
  const datasets = Object.entries(grouped).map(([industry, years]) => ({
    label: industry,
    data: allYears.map(y => years[y] || 0),
    tension: 0.3,
    fill: false
  }));

  const chartData = { labels: allYears, datasets };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: { title: { display: true, text: 'Funding Trends by Industry' } }
      }}
    />
  );
}

//create IndustryTrendChart component