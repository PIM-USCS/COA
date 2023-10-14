import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Falta a pagar', 'Vencidas pós data ', 'exemplo', ],
  datasets: [
    {

      label: '# of Votes',
      data: [12,  2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',

      ],
      borderWidth: 1,
    },
  ],
};


const options = {
  plugins: {
    legend: {
      labels: {
        color: 'rgba(75, 102, 122, 3)', // Defina a cor das legendas
      },
    },
  },
};

export function Chart() {
  return <Pie data={data} options={options} />;
}