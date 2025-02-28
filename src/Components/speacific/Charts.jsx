import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { matBlack, purpleColor, purplelightColor,matBlackLightColor } from '../constants/color';
import { getLast7Days } from '../../Lib/features';

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display:false,
            }
        },
        y: {
            beginAtZero: true,
             grid: {
                display:false,
            }
        },
    }, 
}
 
const labels = getLast7Days();

const LineChart = ({value=[]}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Messages",
                fill: true,
                borderColor: purpleColor,
                backgroundColor: purplelightColor,
            },  
        ]
    }

    return <Line data={ data} options={lineChartOptions}/>
}

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [purplelightColor, matBlackLightColor],
        hoverBackgroundColor: [purpleColor, matBlack],
        borderColor: [purpleColor, matBlack],
        offset: 40,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};

export {LineChart , DoughnutChart}