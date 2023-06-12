import React, { useState, useEffect } from "react";
import { ProfileId, useProfile } from "@lens-protocol/react-web";
import { useContractRead } from "wagmi";

import abi from "../../../abi/contracts.json";

import { tokens } from "../../utils/tokens";
import Link from "next/link";
import { ethers } from "ethers";
import { clientSuperfluid, Superfluid } from "@/pages/api/Superfluid";

interface CampaingCardInterface {
  campaign: any;
}

// amount: number;
// amountFlowRate: number;
// clientAddress: string;
// clientProfile: string;
// flowSenderAddress: string;
// followNftAddress: string;
// idclients: number;
// isHuman: number;
// owner: string;
// publicationId: string;
// tokenX: string;
// totalFollowers: number | null;

export default function CampaingCard({ campaign }: CampaingCardInterface) {
  const [steamActive, setSteamActive] = useState();

  const { data: profile } = useProfile({
    profileId: campaign.clientProfile as ProfileId,
  });

  const add = campaign.flowSenderAddress;

  const token = tokens.filter(
    (token: any) => token.symbol + "x" === campaign.tokenX
  );

  const { data } = useContractRead({
    address: token[0].addressX as `0x${string}`,
    abi: abi.abiSuperTokenX,
    functionName: "balanceOf",
    args: [add],
  });

  async function fetchSteams() {
    const queryBody = `query Steams {
      account(id: "${campaign.flowSenderAddress.toLowerCase()}") {
        id
        accountTokenSnapshots {
          maybeCriticalAtTimestamp
        }
      }
    }`;
    try {
      let response = await clientSuperfluid.query({
        query: Superfluid(queryBody),
      });
      setSteamActive(
        response.data.account.accountTokenSnapshots[0].maybeCriticalAtTimestamp
      );
    } catch (err) {
      console.log(err);
    }
  }

  const date: Date = new Date(Number(steamActive) * 1000);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const dateFormated: string = date
    .toLocaleDateString("es-ES", options)
    .replace(/\//g, "/");

  useEffect(() => {
    fetchSteams();
  }, []);

  return (
    <div
      className={
        campaign.publicationId !== "0x00000"
          ? "px-2 py-1 border-1 border-superfluid-100 rounded-lg m-4 min-h-[340px]"
          : "px-2 pt-8 border-1 border-superfluid-100 rounded-lg m-4 min-h-[340px]"
      }
    >
      {profile && (
        <div className="p-6">
          <div className="flex flex-row justify-between mb-4 text-lg">
            <a
              href={`https://console.superfluid.finance/matic/accounts/${campaign.flowSenderAddress}`}
              target="_blank"
              className="hover:text-superfluid-100"
            >
              {campaign.flowSenderAddress.slice(0, 6)}...
              {campaign.flowSenderAddress.slice(-6)}
            </a>
            <div>
              {Number(data) !== 0.0 ? (
                <div className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-lg">
                  Active
                </div>
              ) : (
                <div className="font-bold text-gray-400 bg-clip-text ">
                  Expired
                </div>
              )}
            </div>{" "}
            {steamActive && <div>End: {dateFormated}</div>}
          </div>
          <div className="flex flex-row justify-between mb-4 text-lg">
            <a
              className="text-center hover:text-superfluid-100 "
              href={`https://lenster.xyz/u/${profile.handle}`}
              target="_blank"
            >
              {profile.handle}{" "}
            </a>
            <div className="text-center">
              {campaign.amountFlowRate.toFixed(2)} {campaign.tokenX} / mo
            </div>
          </div>
          {campaign.publicationId !== "0x00000" && (
            <a
              className="flex justify-center text-center hover:text-superfluid-100 mb-4 text-lg"
              href={`https://lenster.xyz/posts/${campaign.publicationId}`}
              target="_blank"
            >
              https://lenster.xyz/posts/${campaign.publicationId}
            </a>
          )}
          <div className="text-center text-xl font-bold text-superfluid-100 mb-4">
            <div>
              {Number(ethers.utils.formatUnits(data as string, "18")).toFixed(
                2
              )}{" "}
              {campaign.tokenX}
            </div>
          </div>
          <div className="grid grid-cols-4 text-center items-center mb-4 text-lg font-semibold">
            <div>Inicial Followers</div>
            <div>Current Followers</div>
            <div className="col-span-2 ">Gained Followers</div>
          </div>
          <div className="grid grid-cols-4 text-center text-lg font-semibold text-superfluid-100">
            <div>{campaign.totalFollowers}</div>
            <div>{profile.stats.totalFollowers}</div>
            <div>+{profile.stats.totalFollowers - campaign.totalFollowers}</div>
            <div>
              {(
                ((profile.stats.totalFollowers - campaign.totalFollowers) *
                  100) /
                profile.stats.totalFollowers
              ).toFixed(2)}
              %
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
