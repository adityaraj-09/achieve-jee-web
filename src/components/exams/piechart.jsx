import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

 
const options = {
    radius: '60%', 
    cutoutPercentage: 10,
    plugins: {
        legend: {
          display: false,
        },
      },
     
  };

export default function PieChart({per}) {

  const data = {
    labels: ['Physics', 'Chemistry', 'Mathematics'],
    datasets: [
      {
        label: '',
        data: per,
        backgroundColor: [
          '#4318FF',
          '#6AD2FF',
          '#EFF4FB',
        ],
       
       
      },
    ],
  };
  
  return <Pie data={data}  options={options} className="main-chart"/>;
}