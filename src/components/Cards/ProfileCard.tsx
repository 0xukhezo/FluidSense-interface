import React from "react";
import Image from "next/image";

interface LandingWorkCardInterface {
  image: string;
  description: string;
  name: string;
  profileInfo: string;
}

export default function ProfileCard({
  image,
  description,
  name,
  profileInfo,
}: LandingWorkCardInterface) {
  return (
    <div className="flex-col p-[53px] border-2 mx-10 rounded-3xl shadow-2xl mb-10  ">
      <main className="text-lg">{description}</main>
      <div className="grid xl:grid-cols-2 mt-6">
        <Image
          priority
          src={image}
          height={99}
          width={99}
          alt="Profile image"
          className="rounded-full mx-auto my-auto mb-4"
        />
        <div className="my-auto">
          <h2 className="text-superfluid-100 font-bold mb-2 text-lg">{name}</h2>
          <div className="text-sm">{profileInfo}</div>
        </div>
      </div>
    </div>
  );
}
