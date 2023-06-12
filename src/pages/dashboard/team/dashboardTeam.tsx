import React, { useState, useEffect } from "react";

import CampaingCardTeam from "@/components/Cards/CampaingCardTeam";
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

export default function DashboardTeam() {
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
      <div className="flex justify-center flex-col mb-10 mt-16">
        <div className="rounded-3xl bg-white mx-4 overflow-auto max-h-[800px] text-center">
          <div className="grid grid-cols-12 py-6 border-b-superfluid-100 border-b-2">
            <div>Status</div>
            <div>Amount in</div>
            <div>Token X</div>
            <div>Campaign</div>
            <div>End Date</div>
            <div>Lens profile</div>
            <div>Flow</div>
            <div>Post ID</div>
            <div>Inicial Followers</div>
            <div>Current Followers</div>
            <div className="col-span-2 ">Gained Followers</div>
          </div>
          <div className="flex grid grid-rows">
            {campaigns?.map((campaign: Campaign, index: number) => {
              return (
                <div key={index}>
                  <CampaingCardTeam campaign={campaign} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
