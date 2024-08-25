"use client"

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from './Chart';
import { updateSpent } from '@/redux/slices/budgetSlice';

export default function Dashboard() {
  // Fetching transaction adn budget states
  const { transactions } = useSelector((state) => state.transactions);
  const { budget, spent } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  // Calculating the total income
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00);

  // Calculating the total expense
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00);

    // Updating Spent
    useEffect(() => {
      dispatch(updateSpent(totalExpenses));
    }, [])

  return (
    <div className="p-4 bg-black h-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-gray-800 border-gray-700 text-white shadow rounded">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-xl">${totalIncome}</p>
        </div>
        <div className="p-4 bg-gray-800 border-gray-700 text-white shadow rounded">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-xl">${totalExpenses}</p>
        </div>
        <div className="p-4 bg-gray-800 border-gray-700 text-white shadow rounded">
          <h2 className="text-lg font-semibold">Spent / Budget</h2>
          <p className="text-xl">${spent} / ${budget}</p>
        </div>
      </div>

      {/* Charts for visualizingg income and expense details */}
      <div className='h-3/6 flex justify-center'>
        <Chart transactions={transactions} />
      </div>
    </div>
  );
}
