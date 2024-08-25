import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import SmallNav from "./SmallNav";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            FinTracker
          </span>
        </Link>

        <div className="hidden md:block">
          <NavItems />
        </div>
        
        <SmallNav />
      </div>
    </nav>
  );
};

export default Navbar;
