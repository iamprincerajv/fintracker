"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Chart({ transactions }) {
  // Memoizing so that we don't nedd to do unnecessary calculations
  const chartData1 = useMemo(() => {
    // Fetching the income categories for the transactions
    const incomeCategories = transactions
      .filter((t) => t.type === "income")
      .map((t) => t.category);

    // Calculating the total income for the particular category
    const incomeData = incomeCategories.map((category) =>
      transactions
        .filter((t) => t.category === category && t.type === "income")
        .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00)
    );

    return {
      labels: [...new Set([...incomeCategories])],
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  }, [transactions]);

  const chartData2 = useMemo(() => {
    // Fetching the expense categories for the transactions
    const expenseCategories = transactions
      .filter((t) => t.type === "expense")
      .map((t) => t.category);

    // Calculating the total expense for the particular category
    const expenseData = expenseCategories.map((category) =>
      transactions
        .filter((t) => t.category === category && t.type === "expense")
        .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00)
    );

    return {
      labels: [...new Set([...expenseCategories])],
      datasets: [
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    };
  }, [transactions]);

  return (
    <div className="block md:flex md:justify-between md:items-center mt-20 md:mt-0">
      <div className="mb-10 md:mb-0 md:mr-10">
        <h4 className="text-white font-semibold mb-5">Income</h4>
        <Bar data={chartData1} />
      </div>
      <div>
      <h4 className="text-white font-semibold mb-5">Expense</h4>
        <Bar data={chartData2} />
      </div>
    </div>
  );
}
