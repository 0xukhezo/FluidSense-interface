import React from "react";
import Image from "next/image";

interface LandingWorkCardInterface {
  image: string;
  title: string;
}

export default function LandingWorkCard({
  image,
  title,
}: LandingWorkCardInterface) {
  return (
    <div className="items-center flex flex-col text-center">
      <Image
        priority
        src={image}
        height={61}
        width={300}
        alt="Fluid sense logo"
        className="mx-4"
      />
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
