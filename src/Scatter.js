import React from 'react';
import { Line } from 'react-chartjs-2';


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

export const Scatter = (props) => {
  let x = [];
  let y = [];
  props.seasonPointsTable.map((result, index) => { 
    x.push(result.a)
    y.push(result.b)
  })
  console.log(y)
  const cumulativeSum = (sum => value => sum += value)(0);
  var result = y.map(function (u) { 
    return parseInt(u, 10); 
  });
  console.log(result)
  const cum = result.map(cumulativeSum)
  const data = {
    labels: x,
    datasets: [
      {
        label: 'Points Over Season',
        data: cum,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  return (  
    <React.Fragment>
    <>
      <div className='header'>
        <h1 className='title'></h1>
      </div>
      <Line data={data} options={options} />
    </>
     </React.Fragment>
  );
}

export default Scatter;