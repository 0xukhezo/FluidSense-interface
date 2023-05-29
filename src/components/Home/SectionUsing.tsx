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
  title: string;
  description: string;
  image: string;
  name: string;
  profileInfo: string;
};

const sponsors = [
  { image: CryptoPlaza.src },
  { image: SuperFluid.src },
  { image: Maker.src },
  { image: CoinShift.src },
];

const profiles = [
  {
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    image: Especulacion.src,
    name: "especulacion.lens",
    profileInfo:
      "Founder of Crypto Plaza, and Manager of Roble Venture Capital. Delegate in AAVE Ambassador of Superfluid and MakerDAO.",
  },
  {
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    image: Ukhezo.src,
    name: "ukhezo.lens",
    profileInfo: "Web3 Developer",
  },
];

export default function SectionUsing() {
  return (
    <div className="mb-[80px]">
      <h1 className="mt-[112px] text-center font-bold text-4xl">
        Who is using FluidSense?
      </h1>
      <div className="flex flex-row mx-6 justify-between mt-[67px] border-b-1 border-b-superfluid-100 mx-[120px] px-[24px]">
        {sponsors.map((sponsor: Sponsor, index: number) => {
          return (
            <div key={index} className="flex pb-16">
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
      <h2 className="mt-[72px] text-center font-bold text-4xl">
        What they say about us
      </h2>
      <div className="text-center max-w-[728px] mt-8 mx-auto mb-[40px]">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
        mattis ligula consectetur, ultrices mauris.
      </div>
      <div className="flex flex-row px-32 ">
        {profiles.map((profile: Profile, index: number) => {
          return (
            <div key={index}>
              <ProfileCard
                title={profile.title}
                description={profile.description}
                image={profile.image}
                name={profile.name}
                profileInfo={profile.profileInfo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
