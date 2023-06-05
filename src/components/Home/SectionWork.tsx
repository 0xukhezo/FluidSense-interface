import React from "react";

import LandingWorkCard from "../Cards/LandingWorkcard";

import Wallet from "../../../public/WalletInfo.svg";
import Content from "../../../public/ContentInfo.svg";
import Rewards from "../../../public/RewardsInfo.svg";
import Rocket from "../../../public/RocketInfo.svg";

type Info = {
  title: string;
  description: string;
  image: string;
};

const cardInfo = [
  {
    title: "Connect your Wallet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
    image: Wallet.src,
  },
  {
    title: "Connect your Wallet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
    image: Content.src,
  },
  {
    title: "Connect your Wallet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
    image: Rewards.src,
  },
  {
    title: "Connect your Wallet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
    image: Rocket.src,
  },
];

export default function SectionWork() {
  return (
    <div className="text-center px-32">
      <h1 className="font-bold text-4xl mb-[45px] mt-[101px]">
        How does it work?
      </h1>
      <div className="flex flex-row items-center justify-center mb-[102px]">
        {cardInfo.map((info: Info, index: number) => {
          return (
            <div className="mx-6 max-w-[310px]" key={index}>
              <LandingWorkCard
                title={info.title}
                description={info.description}
                image={info.image}
              />{" "}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
