import React from "react";
import Image from "next/image";

interface LandingWorkCardInterface {
  image: string;
  title: string;
  description: string;
  name: string;
  profileInfo: string;
}

export default function ProfileCard({
  image,
  title,
  description,
  name,
  profileInfo,
}: LandingWorkCardInterface) {
  return (
    <div className="flex-col p-[53px] border-2 mx-10 rounded-3xl shadow-2xl">
      <h1 className="text-superfluid-100 font-bold mb-2">{title}</h1>
      <main>{description}</main>
      <div className="flex flex-row justify-between mt-6">
        <Image
          priority
          src={image}
          height={99}
          width={99}
          alt="Profile image"
          className="rounded-full"
        />
        <div className="flex flex-col w-3/4">
          <h2 className="text-superfluid-100 font-bold mb-2">{name}</h2>
          <div>{profileInfo}</div>
        </div>
      </div>
    </div>
  );
}
