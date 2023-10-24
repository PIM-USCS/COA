import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarProps {
  totalPago: number[];
  totalAberto: number[];
  totalVencido: number[];
}

export function Barra({ totalAberto, totalPago, totalVencido }: BarProps) {
  const data = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Valor guias vencidas",
        data: totalVencido,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Valor guias em aberto",
        data: totalAberto,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Valor guias pagas",
        data: totalPago,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  console.log(data);

  return <Bar options={options} data={data} />;
}
