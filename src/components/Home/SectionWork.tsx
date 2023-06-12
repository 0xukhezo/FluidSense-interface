import React from "react";

import LandingWorkCard from "../Cards/LandingWorkCard";

import Wallet from "../../../public/WalletInfo.svg";
import Content from "../../../public/ContentInfo.svg";
import Rewards from "../../../public/RewardsInfo.svg";
import Rocket from "../../../public/RocketInfo.svg";

type Info = {
  title: string;
  image: string;
};

const cardInfo = [
  {
    title: "Connect your Wallet",
    image: Wallet.src,
  },
  {
    title: "Select the profile or the post to boost ",
    image: Content.src,
  },
  {
    title: "Select the reward ",
    image: Rewards.src,
  },
  {
    title: "Launch your campaign",
    image: Rocket.src,
  },
];

export default function SectionWork() {
  return (
    <div className="text-center lg:px-32">
      <h1 className="font-bold text-4xl mb-[45px] lg:mt-[101px]">
        How does it work?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-[102px] mx-auto">
        {cardInfo.map((info: Info, index: number) => {
          return (
            <div className=" max-w-[310px] mt-6 mx-auto" key={index}>
              <LandingWorkCard title={info.title} image={info.image} />{" "}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
