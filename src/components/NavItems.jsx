"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  const router = useRouter();

  // Implementing prefetching on hover
  const handlePrefetch = (path) => {
    router.prefetch(path);
  }
  return (
    <div className="w-full md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
        <li>
          <Link
            href="/"
            className={`block py-2 px-3 md:p-0 rounded md:border-0 ${
              pathname == "/" ? "text-blue-500" : "text-white"
            } md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent`}
            prefetch={false}
            onMouseEnter={() => handlePrefetch("/")}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/transactions"
            className={`block py-2 px-3 md:p-0 rounded md:border-0 ${
              pathname == "/transactions" ? "text-blue-500" : "text-white"
            } md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent`}
            prefetch={false}
            onMouseEnter={() => handlePrefetch("/transactions")}
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            href="/budget"
            className={`block py-2 px-3 md:p-0 rounded md:border-0 ${
              pathname == "/budget" ? "text-blue-500" : "text-white"
            } md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent`}
            prefetch={false}
            onMouseEnter={() => handlePrefetch("/budget")}
          >
            Budget
          </Link>
        </li>
        <li></li>
      </ul>
    </div>
  );
}
