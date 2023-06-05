import React from "react";
import Image from "next/image";

import LogoName from "../../../public/LogoName.svg";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between px-32 pt-6">
      <Image
        priority
        src={LogoName}
        height={61}
        width={300}
        alt="Fluid sense logo"
        className="mx-4"
      />
      <div className="w-1/3 flex justify-between items-center text-lg text-white pl-8">
        <a>About</a>
        <a>Contact</a>
        <button className="font-semibold text-black px-10 py-4 rounded-full h-12 bg-superfluid-100 flex items-center leading-6">
          Launch App
        </button>
      </div>
    </div>
  );
}
