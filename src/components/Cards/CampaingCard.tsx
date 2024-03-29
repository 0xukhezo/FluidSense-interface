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

export default function CampaingCard({ campaign }: CampaingCardInterface) {
  const [steamActive, setSteamActive] = useState();
  const [steams, setSteams] = useState<any[]>();

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
        outflows {
          receiver {
            id
          }
          currentFlowRate
        }
      }
    }`;

    try {
      let response = await clientSuperfluid.query({
        query: Superfluid(queryBody),
      });
      console.log(response);
      setSteamActive(
        response.data.account.accountTokenSnapshots[0].maybeCriticalAtTimestamp
      );
      let data = response.data.account.outflows;

      const steams: string[] = [];
      const flows: number[] = [];

      for (var i = 0; i < data.length; i++) {
        const elemento = data[i].receiver.id;
        const currentFlowRate = data[i].currentFlowRate;

        if (!steams.includes(data[i].receiver.id)) {
          steams.push(elemento);
          flows.push(currentFlowRate);
        }
      }

      const mergedData = steams.reduce(
        (result: any, receiver: any, index: number) => {
          return [...result, { receiver, flow: flows[index] }];
        },
        []
      );

      setSteams(mergedData);
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
          ? "sm:px-2 py-1 border-1 border-superfluid-100 rounded-lg sm:m-4 min-h-[340px] my-4"
          : "sm:px-2 pt-8 border-1 border-superfluid-100 rounded-lg sm:m-4 min-h-[340px] my-4"
      }
    >
      {profile && steams && (
        <div className="sm:p-6">
          <div className="flex sm:flex-row flex-col justify-between mb-4 text-lg">
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
          <div className="flex  sm:flex-row flex-col justify-between mb-4 text-lg">
            <div>
              <span className="font-bold">Follow:</span> {profile.handle}
              <a
                className="text-center hover:text-superfluid-100 "
                href={`https://lenster.xyz/u/${profile.handle}`}
                target="_blank"
              ></a>
            </div>
            <div className="text-center">
              {campaign.amountFlowRate.toFixed(2)} {campaign.tokenX} / mo
            </div>
          </div>
          {campaign.publicationId !== "0x00000" && (
            <div className="flex  sm:flex-row flex-col justify-center text-center mb-4 text-lg">
              <span className="font-bold ">Mirror: </span>
              <a
                className="hover:text-superfluid-100 "
                href={`https://lenster.xyz/posts/${campaign.publicationId}`}
                target="_blank"
              >
                {" "}
                https://lenster.xyz/posts/${campaign.publicationId}
              </a>
            </div>
          )}
          <div className="text-center text-xl font-bold text-superfluid-100 mb-4">
            <div>
              {Number(ethers.utils.formatUnits(data as string, "18")).toFixed(
                2
              )}{" "}
              {campaign.tokenX}
            </div>
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-2 text-center items-center mb-4 text-lg font-semibold">
            <div>Inicial Followers</div>
            <div>Current Followers</div>
            <div className="col-span-2 hidden sm:block">Gained Followers</div>
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-2 text-center text-lg font-semibold text-superfluid-100">
            <div>{campaign.totalFollowers}</div>
            <div>{profile.stats.totalFollowers}</div>
            <div className="col-span-2 text-black">Gained Followers</div>
            <div>+{steams?.length}</div>
            <div>
              {((steams?.length * 100) / campaign.totalFollowers).toFixed(2)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
