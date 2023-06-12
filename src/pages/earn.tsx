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

export default function Earn() {
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
        <div className=" w-2/3 rounded-3xl bg-white mx-auto overflow-auto max-h-[800px] text-center">
          <h3 className="mt-10 text-4xl text-superfluid-100 font-bold">
            Earn super tokens with these campaigns
          </h3>
          <div className="mt-6">
            <p className="mb-4">Follow the instructions to get super tokens:</p>
            <ul>
              <li>1. Check if the campaign is active</li>
              <li>
                2. In case it has a publication, click on the publication and
                mirror it!
              </li>
              <li>
                3. Once you have done the mirror in case the layer has this
                option activated, follow that user in Lens.
              </li>
              <li>
                4. Check your new flow in the Superfluid console or in our
                dashboard!
              </li>
            </ul>
          </div>

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
