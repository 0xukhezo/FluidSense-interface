import React from "react";
import Image from "next/image";

import ProfileCard from "../Cards/ProfileCard";

import CryptoPlaza from "../../../public/CryptoPlaza.svg";
import SuperFluid from "../../../public/SuperFluid.svg";
import Maker from "../../../public/Maker.svg";
import CoinShift from "../../../public/CoinShift.svg";
import Ukhezo from "../../../public/Ukhezo.png";
import Especulacion from "../../../public/Especulacion.png";

type Sponsor = {
  image: string;
};

type Profile = {
  description: string;
  image: string;
  name: string;
  profileInfo: string;
};

const sponsors = [
  { image: CryptoPlaza.src },
  { image: SuperFluid.src },
  { image: Maker.src },
  // { image: CoinShift.src },
];

const profiles = [
  {
    description:
      "Fluidsense has been a game-changer for my business. I was able to reach and engage with my ideal customers in a fast and effective way. Thanks to Fluidsense, I increased my brand awareness, traffic, and sales.",
    image: Especulacion.src,
    name: "especulacion.lens",
    profileInfo:
      "CEO and Co-Founder of Fluidsense. Founder of Crypto Plaza, and Manager of Roble Venture Capital. Delegate in AAVE Ambassador of Superfluid and MakerDAO.",
  },
  {
    description:
      "This is an amazing platform for web 3 developers. It allows me to showcase my projects and get feedback from the community. I also get rewarded for interacting with other developers and learning from their work.",
    image: Ukhezo.src,
    name: "ukhezo.lens",
    profileInfo: "Co-Founder of Fluidsense. Web3 Developer",
  },
];

export default function SectionUsing() {
  return (
    <div className="mb-[80px]">
      <h1 className="mt-[112px] text-center font-bold text-4xl">
        Who is using FluidSense?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mx-6 justify-between mt-[67px] border-b-1 border-b-superfluid-100 mx-[120px] px-[24px] mx-auto gap-x-10">
        {sponsors.map((sponsor: Sponsor, index: number) => {
          return (
            <div key={index} className="flex pb-16 mx-auto">
              <Image
                priority
                src={sponsor.image}
                height={101}
                width={300}
                alt="Sponsor logo"
              />
            </div>
          );
        })}{" "}
      </div>
      <h2 className="mt-[72px] text-center font-bold text-4xl mb-9">
        What they say about us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:px-32 max-h-fit">
        {profiles.map((profile: Profile, index: number) => {
          return (
            <ProfileCard
              description={profile.description}
              image={profile.image}
              name={profile.name}
              profileInfo={profile.profileInfo}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
