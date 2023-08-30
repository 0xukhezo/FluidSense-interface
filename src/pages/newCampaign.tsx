import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import CampaignForm from "@/components/Form/CampaignForm";

import CampaignDisplayer from "@/components/CampaingInfo/CampaignDisplayer";
import NavbarApp from "@/components/Layout/NavbarApp";

export default function NewCampaign() {
  const { address, isConnected } = useAccount();
  const [campaigns, setCampaigns] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getClients() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_CLIENTS as string
      )
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
        (campaing: any) => campaing.owner === address
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
      <NavbarApp />
      <div className="flex justify-center flex-col mb-10">
        <div className="h-fit xl:w-container mx-4 rounded-3xl bg-white xl:mx-auto pb-6">
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
