import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import CampaignForm from "@/components/CampaignForm";
import CampaignShows from "@/components/CampaignShows";

import { Profile } from "@/components/Profile";

import Image from "next/image";
import Logo from "../../public/Iso.svg";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [campaigns, setCampaigns] = useState<any>([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    mode: "no-cors" as RequestMode,
  };

  async function getClients() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API as string,
        options
      );
      // console.log(response.body);
      // setCampaigns(response.body);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getClients();
  }, [isConnected]);

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
            <CampaignForm />
          </div>
        </div>
        {isConnected &&
          (campaigns.length !== 0 ? (
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
                <CampaignShows
                  campaign={campaigns.flowSenderAddress}
                  amount={campaigns.amount}
                />
              </div>
            </div>
          ) : (
            <div className="h-containerCampaign w-containerCampaign rounded-3xl bg-white mx-auto my-10">
              <div className="flex justify-center mt-4 flex-col px-10">
                <h2 className="text-2xl mx-auto mt-2 mb-4 text-superfluid-100 leading-8 font-bold">
                  Your Campaign
                </h2>
                <div className="text-xl mx-auto mt-6 mb-4 text-superfluid-100 leading-4 font-semibold">
                  Sorry but you haven't got campaigns actives!
                </div>
                <div className="text-xl mx-auto  text-superfluid-100 leading-4 font-semibold">
                  Please create a campaign for your Lens profile
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
