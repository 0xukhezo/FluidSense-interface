import React, { useState, useEffect } from "react";

import CampaingCard from "@/components/Cards/CampaingCard";
import NavbarApp from "@/components/Layout/NavbarApp";

type Campaign = {
  amount: number;
  amountFlowRate: number;
  clientAddress: string;
  clientProfile: string;
  flowSenderAddress: string;
  followNftAddress: string;
  idclients: number;
  isHuman: number;
  owner: string;
  publicationId: string;
  tokenX: string;
  totalFollowers: number | null;
};

export default function allCampaings() {
  const [campaigns, setCampaigns] = useState<any[]>();

  async function getCampaigns() {
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
      setCampaigns(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div className="bg-[url('../../public/bg1.jpg')] h-screen bg-no-repeat bg-center bg-cover pt-4 overflow-auto ">
      <NavbarApp />
      <div className="flex justify-center flex-col mb-10">
        <div className=" w-2/3 rounded-3xl bg-white mx-auto overflow-auto max-h-[800px]">
          <div className="flex grid grid-cols-2 m-10 ">
            {campaigns?.map((campaign: Campaign, index: number) => {
              return (
                <div key={index}>
                  <CampaingCard campaign={campaign} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
