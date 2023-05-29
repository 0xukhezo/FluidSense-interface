import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Iso.svg";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import { Profile } from "@/components/Buttons/Profile";
import CampaignDetails from "@/components/CampaingInfo/CampaignDetails";
import { tokens } from "@/utils/tokens";

export default function CampaignPage() {
  const { query } = useRouter();
  const [campaign, setCampaign] = useState<any>();
  const [tokenAddress, setTokenAddress] = useState<any>();

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
      const tokenAddress = tokens.filter(
        (token) => token.symbol + "x" === campaingsOwned[0].tokenX
      );
      setCampaign(campaingsOwned[0]);
      setTokenAddress(tokenAddress[0].addressX as `0x${string}`);
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
      {campaign !== undefined && tokenAddress !== undefined && (
        <div className="flex justify-center flex-col">
          <div className="h-containerDetails w-container rounded-3xl bg-white mx-auto">
            <div className="flex justify-center mt-10 flex-col">
              <div className="flex">
                <Link href="/newCampaign">
                  <ChevronLeftIcon
                    className="h-10 text-superfluid-100 ml-4"
                    aria-hidden="true"
                  />
                </Link>
                <h2 className="text-2xl mx-auto my-2 text-superfluid-100 leading-8 font-bold ">
                  <span className="-ml-14">Your campaign</span>
                </h2>
              </div>
              <CampaignDetails
                lensProfile={campaign.clientProfile}
                flowSenderAddress={campaign.flowSenderAddress}
                amountFlowRate={campaign.amountFlowRate}
                initialFollowers={campaign.totalFollowers}
                tokenX={campaign.tokenX}
                tokenAddress={tokenAddress}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
