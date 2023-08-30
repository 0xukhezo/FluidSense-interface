import React from "react";
import Image from "next/image";

import LogoName from "../../../public/LogoName.svg";
import Twitter from "../../../public/Twitter.svg";
import Lens from "../../../public/Lens.svg";
import Discord from "../../../public/Discord.svg";

import SuperFluidWhite from "../../../public/SuperFluidWhite.svg";

type Link = {
  href: string;
  image: string;
};

const links = [
  {
    href: "/twitter",
    image: Twitter.src,
  },
  {
    href: "https://lenster.xyz/u/fluidsense",
    image: Lens.src,
  },
  {
    href: "/discord",
    image: Discord.src,
  },
];

export default function Footer() {
  return (
    <div className="flex flex-col items-center bg-darkBlue text-superfluid-100 py-[80px]">
      <Image
        priority
        src={LogoName}
        height={61}
        width={300}
        alt="Fluid sense logo"
        className="mx-4 mb-6"
      />
      <div>build in</div>
      <Image
        priority
        src={SuperFluidWhite}
        height={35}
        width={150}
        alt="Fluid sense logo"
        className="mx-4 my-6"
      />
      <div>Come say hi!👋</div>
      <div className="flex felx-row mt-8">
        {links.map((link: Link, index: number) => {
          return (
            <a
              key={index}
              href={link.href}
              target="_blank"
              className="flex p-2 bg-superfluid-100 rounded-3xl min-w-[24px] min-h-[24px] mx-4"
            >
              <Image
                priority
                src={link.image}
                height={24}
                width={24}
                alt="Fluid sense logo"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
