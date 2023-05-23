import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import CampaignForm from "@/components/CampaignForm";

import { Profile } from "@/components/Profile";

import Image from "next/image";
import Logo from "../../public/Iso.svg";
import CampaignDisplayer from "@/components/CampaignDisplayer";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [campaigns, setCampaigns] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getClients() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API as string)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json();
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
      const campaingsOwned = response.filter(
        (campaing: any) => campaing.owner !== address
      );
      setCampaigns(campaingsOwned);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getClients();
  }, [isConnected]);

  useEffect(() => {
    setLoading(true);
  }, [campaigns]);

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
        {loading ? (
          <CampaignDisplayer isConnected={isConnected} campaigns={campaigns} />
        ) : (
          <div className="h-containerCampaign w-containerCampaign rounded-3xl bg-white mx-auto my-10 overflow-auto">
            <div className="flex justify-center mt-4 flex-col px-10">
              <h2 className="text-2xl mx-auto mt-4 mb-4 text-superfluid-100 leading-8 font-bold">
                Your Campaign
              </h2>
              <div className="grid grid-cols-3 align-center mb-6">
                <div className="flex justify-center">Campaign</div>
                <div className="flex justify-center">Status</div>
                <div className="flex justify-center">Amount</div>
              </div>
              <div>Loading Campaings</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
