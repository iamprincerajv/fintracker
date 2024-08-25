"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTransaction } from "@/redux/slices/transactionsSlice";

export default function TransactionForm() {
  const { id } = useParams();
  const router = useRouter();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { transactions } = useSelector((state) => state.transactions);
  const toUpdate = transactions.filter((t) => t.id == id);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setType(toUpdate[0].type);
    setCategory(toUpdate[0].category);
    setAmount(toUpdate[0].amount);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTransaction({id, updatedTransaction: {
        id,
        type,
        category,
        amount: parseFloat(amount).toFixed(2),
      }})
    );
    router.replace("/transactions");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
        <form className="space-y-6 text-center" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-white">Update Transaction</h5>
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
          <div className="text-left">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-white"
            >
              Enter Amount Here
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              name="amount"
              id="amount"
              className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="$100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
