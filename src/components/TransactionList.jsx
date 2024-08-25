"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/slices/transactionsSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TransactionList() {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const router = useRouter();

  // Implementing prefetching on hover
  const handlePrefetch = (path) => {
    router.prefetch(path);
  }

  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4 text-white">Transactions</h2>
        <Link
          href="/transactions/add"
          className="flex justify-between text-blue-300 items-center text-sm"
          prefetch={false}
          onMouseEnter={() => handlePrefetch("/transactions/add")}
        >
          <Image
            src="/plus.svg"
            alt="add"
            style={{
              filter:
                "invert(67%) sepia(55%) saturate(380%) hue-rotate(181deg) brightness(102%) contrast(98%)",
            }}
            width={10}
            height={10}
          />
          <span className="ms-1">ADD</span>
        </Link>
      </div>
      <ul className="text-white">
        {/* Fetching all the transactions */}
        
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li key={t.id} className="flex justify-between py-2">
              <div className="w-5/6 flex justify-between me-8">
                <span>{t.category}</span>
                <span>
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </span>
              </div>

              <div className="flex justify-between w-1/6">
                <Link href={`/transactions/edit/${t.id}`} prefetch={false} onMouseEnter={() => handlePrefetch(`/transactions/edit/${t.id}`)}>
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                    style={{
                      filter:
                        "invert(53%) sepia(95%) saturate(918%) hue-rotate(77deg) brightness(107%) contrast(136%)",
                    }}
                  />
                </Link>
                <button
                  onClick={() => dispatch(deleteTransaction(t.id))}
                  className="text-red-500"
                >
                  <Image
                    src="/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                    style={{
                      filter:
                        "invert(15%) sepia(59%) saturate(6995%) hue-rotate(357deg) brightness(96%) contrast(114%)",
                    }}
                  />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-center py-2 italic">
            No transactions yet
          </li>
        )}
      </ul>
    </div>
  );
}
