import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CobrancaProps } from "../../../@types/Cobranca";

interface ChartList {
  cobrancasVencidas: CobrancaProps[];
  cobrancasPagas: CobrancaProps[];
  cobrancasAberto: CobrancaProps[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart({
  cobrancasAberto,
  cobrancasPagas,
  cobrancasVencidas,
}: ChartList) {
  const data = {
    labels: ["Vencidas", "Em aberto ", "Pagas"],
    datasets: [
      {
        label: "Quantidade de guias",
        data: [
          cobrancasVencidas.length,
          cobrancasAberto.length,
          cobrancasPagas.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(75, 102, 122, 3)", // Defina a cor das legendas
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
