import React, { useState, useEffect } from "react";

import CampaignForm from "@/components/CampaignForm";
import CampaignShows from "@/components/CampaignShows";

import { Profile } from "@/components/Profile";

import Image from "next/image";
import Logo from "../../public/Iso.svg";

export default function Home() {
  const [campaign, setCampaign] = useState<string>(
    "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
  );
  const [amount, setAmount] = useState<number>();

  const getCampaing = (campaign: string, amount: number) => {
    setCampaign(campaign);
    setAmount(amount);
  };

  return (
    <div className="bg-[url('../../public/bg1.jpg')] h-screen bg-no-repeat bg-center bg-cover pt-4 overflow-auto">
      <div className="flex pb-10 pt-20 relative ">
        <h1 className="text-4xl text-superfluid-100 flex font-bold tracking-wider absolute inset-0 w-screen">
          <div className="m-auto flex items-center">
            <Image
              priority
              src={Logo}
              height={64}
              width={70}
              alt="Fluid sense logo"
              className="mx-4"
            />
            FluidSense
          </div>
        </h1>
        <Profile />
      </div>
      <div className="flex justify-center flex-col mb-10">
        <div className="h-container w-container rounded-3xl bg-white mx-auto">
          <div className="flex justify-center mt-6 flex-col">
            <h2 className="text-2xl mx-auto my-2 text-superfluid-100 leading-8 font-bold">
              Set up your campaign
            </h2>
            <CampaignForm getCampaing={getCampaing} />
          </div>
        </div>
        {campaign && amount && (
          <div className="h-containerCampaign w-containerCampaign rounded-3xl bg-white mx-auto my-10">
            <div className="flex justify-center mt-4 flex-col px-10">
              <h2 className="text-2xl mx-auto mt-2 mb-4 text-superfluid-100 leading-8 font-bold">
                Your Campaign
              </h2>
              <div className="grid grid-cols-3 align-center px-10 mr-4">
                <div className="flex justify-center">Campaign</div>
                <div className="flex justify-center">Status</div>
                <div className="flex justify-center">Amount</div>
              </div>
              <CampaignShows campaign={campaign} amount={amount} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
