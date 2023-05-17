import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Iso.svg";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import { Profile } from "@/components/Profile";
import CampaignDetails from "@/components/CampaignDetails";

export default function CampaignPage() {
  const { query } = useRouter();
  const [campaign, setCampaign] = useState<any>();
  async function getCampaign() {
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
        (campaing: any) => campaing.flowSenderAddress === query.campaign
      );
      setCampaign(campaingsOwned[0]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCampaign();
  });

  return (
    <div className="bg-[url('../../public/bg1.jpg')] h-screen bg-no-repeat bg-center bg-cover pt-10 overflow-auto">
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
      {campaign !== undefined && (
        <div className="flex justify-center flex-col">
          <div className="h-containerDetails w-container rounded-3xl bg-white mx-auto">
            <div className="flex justify-center mt-10 flex-col">
              <div className="flex">
                <Link href="/">
                  <ChevronLeftIcon
                    className="h-10 w-10 text-superfluid-100"
                    aria-hidden="true"
                  />
                </Link>
                <h2 className="text-2xl mx-auto my-2 text-superfluid-100 leading-8 font-bold">
                  Your campaign
                </h2>
              </div>
              <CampaignDetails
                amount={campaign.amount}
                flowSenderAddress={campaign.flowSenderAddress}
                amountFlowRate={campaign.amountFlowRate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
