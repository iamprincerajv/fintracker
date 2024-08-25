"use client";

import Image from "next/image";
import React, { useState } from "react";
import NavItems from "./NavItems";

export default function SmallNav() {
  const [show, setShow] = useState("hidden");

  const showMenu = () => {
    if (show == "hidden") {
      setShow("block");
    } else {
      setShow("hidden");
    }
  };
  return (
    <div className="md:hidden">
      <div onClick={showMenu} className="w-9 flex justify-center rounded"> 
        <Image
          src="/menu.svg"
          alt="menu"
          width={8}
          height={8}
          style={{
            filter:
              "invert(100%) sepia(5%) saturate(7478%) hue-rotate(306deg) brightness(116%) contrast(104%)",
          }}
        />
      </div>
      <div className={`fixed top-20 right-0 w-3/4 sm:w-2/6 p-3 ${show}`}>
        <NavItems />
      </div>
    </div>
  );
}
