import React, { useState, useEffect } from "react";
import { ProfileId, useProfile } from "@lens-protocol/react-web";
import { useContractRead } from "wagmi";

import abi from "../../../abi/contracts.json";

import { tokens } from "../../utils/tokens";
import Link from "next/link";
import { ethers } from "ethers";
import { clientSuperfluid, Superfluid } from "@/pages/api/Superfluid";

interface CampaingCardTeamInterface {
  campaign: any;
}

export default function CampaingCardTeam({
  campaign,
}: CampaingCardTeamInterface) {
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
    <div className="">
      {profile && (
        <div className="grid grid-cols-12 border-t-superfluid-100 border-t-1 py-4">
          <div>
            {Number(data) !== 0.0 ? (
              <div className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-lg">
                Active
              </div>
            ) : (
              <div className="font-bold text-gray-400 bg-clip-text text-lg">
                Expired
              </div>
            )}
          </div>
          <div>
            {Number(ethers.utils.formatUnits(data as string, "18")).toFixed(2)}{" "}
          </div>
          <div>{campaign.tokenX} </div>

          <a
            href={`https://console.superfluid.finance/matic/accounts/${campaign.flowSenderAddress}`}
            target="_blank"
            className="hover:text-superfluid-100"
          >
            {campaign.flowSenderAddress.slice(0, 6)}...
            {campaign.flowSenderAddress.slice(-6)}
          </a>

          <div>{steamActive ? <div>{dateFormated}</div> : <div>-</div>} </div>
          <a
            className=" hover:text-superfluid-100 "
            href={`https://lenster.xyz/u/${profile.handle}`}
            target="_blank"
          >
            {profile.handle}
          </a>
          <div>
            {campaign.amountFlowRate.toFixed(2)} {campaign.tokenX} / mo
          </div>
          {campaign.publicationId !== "0x00000" ? (
            <a
              className="hover:text-superfluid-100 "
              href={`https://lenster.xyz/posts/${campaign.publicationId}`}
              target="_blank"
            >
              {campaign.publicationId}
            </a>
          ) : (
            <div>-</div>
          )}

          <div>{campaign.totalFollowers}</div>
          <div>{profile.stats.totalFollowers}</div>
          <div>+{profile.stats.totalFollowers - campaign.totalFollowers}</div>
          <div>
            {(
              ((profile.stats.totalFollowers - campaign.totalFollowers) * 100) /
              profile.stats.totalFollowers
            ).toFixed(2)}
            %
          </div>
        </div>
      )}
    </div>
  );
}
