"use client";

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBudget } from "../redux/slices/budgetSlice";

export default function BudgetGoalForm() {
  const [budgetValue, setBudgetValue] = useState(0);
  const dispatch = useDispatch();

  // Setting the budget and storing it in the redux state
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setBudget(parseFloat(budgetValue)));
    setBudgetValue(0);
  };

  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
      <form className="space-y-6 text-center" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-white">
          Monthly Budget
        </h5>
        <div className="text-left">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-white"
          >
            Enter Amount Here
          </label>
          <input
            onChange={(e) => setBudgetValue(e.target.value)}
            value={budgetValue}
            type="number"
            name="amount"
            id="amount"
            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="$100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Set Budget
        </button>
        <div className="text-xs italic font-medium text-gray-300">
          A Positive Step Towards Financial Management
        </div>
      </form>
    </div>
  );
}
