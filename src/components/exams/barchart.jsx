import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    maintainAspectRatio: false ,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['you', 'Average'];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [1800,1200],
      backgroundColor: '#04CD00',
    },
    
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data}width={50}
  height={100}/>;
}
