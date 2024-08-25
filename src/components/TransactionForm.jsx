"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";
import { useGetExchangeRatesQuery } from "@/redux/slices/exchangeRateApi";

export default function TransactionForm() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { transactions } = useSelector((state) => state.transactions);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency, setcurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState([]);

  // Fetching the data from Exchange Rate API
  const { data, error, isLoading } = useGetExchangeRatesQuery(
    process.env.NEXT_PUBLIC_API_KEY
  );

  // Memoizing to prevent unnecessary calculations
  const currencyType = useMemo(() => {
    if (data) {
      setExchangeRates(data.conversion_rates);
      return Object.keys(data.conversion_rates);
    }
    return ["USD", "INR", "JPY", "RUB", "CNY"];
  }, [data]);

  // Converting the input from user's currency to USD
  const handleCurrency = () => {
    setAmount2(amount / exchangeRates[currency]);
  };

  useEffect(() => {
    handleCurrency();
  }, [amount, currency]);

  // Adding the transaction to redux state
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTransaction({
        id: Date.now(),
        type,
        category,
        amount: parseFloat(amount2).toFixed(2),
      })
    );
    setAmount(0);
  };

  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
      <form className="space-y-6 text-center" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-white">New Transaction</h5>
        <div className="text-left">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-white"
          >
            Transaction Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="text-left">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-white"
          >
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category, index) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="text-left">
            <label
              htmlFor="currencyType"
              className="block mb-2 text-sm font-medium text-white"
            >
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setcurrency(e.target.value)}
              id="currencyType"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              {currencyType.map((type, index) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="text-left">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-white"
            >
              Amount (Your Currency)
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              name="amount"
              id="amount"
              className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="100"
              required
            />
          </div>
        </div>

        <div className="text-left">
          <label
            htmlFor="amount2"
            className="block mb-2 text-sm font-medium text-white"
          >
            Amount (in USD)
          </label>
          <input
            readOnly
            value={amount2.toFixed(2)}
            type="number"
            name="amount2"
            id="amount2"
            className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="100"
            required
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
