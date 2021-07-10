import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    {
      label: 'Points Tracker',
      data: [18, 43, 61, 80, 105, 130, 155, 167, 182],
      fill: false,
      backgroundColor: '#161c2c',
      borderColor: '#161c2c',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const Scatter = () => (
  <>
    <div className='header'>
      <h1 className='title'></h1>
    </div>
    <Line data={data} options={options} />
  </>
);

export default Scatter;