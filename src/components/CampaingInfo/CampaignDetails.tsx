import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { ProfileId, useProfile } from "@lens-protocol/react-web";

import abi from "../../../abi/contracts.json";
import { ethers } from "ethers";
import { clientSuperfluid, Superfluid } from "@/pages/api/Superfluid";
import SteamCard from "../Cards/SteamCard";

interface CampaignDetailsInterface {
  lensProfile: string;
  flowSenderAddress: string;
  amountFlowRate: number;
  initialFollowers: number;
  tokenX: string;
  tokenAddress: `0x${string}`;
}

export default function CampaignDetails({
  lensProfile,
  flowSenderAddress,
  amountFlowRate,
  initialFollowers,
  tokenX,
  tokenAddress,
}: CampaignDetailsInterface) {
  const { data: profile } = useProfile({
    profileId: lensProfile as ProfileId,
  });

  const [balance, setBalance] = useState<string>();
  const [steams, setSteams] = useState<any[]>();
  const [loadingSteams, setLoadingSteams] = useState<boolean>(false);

  const { data, isSuccess } = useContractRead({
    address: tokenAddress,
    abi: abi.abiSuperTokenX,
    functionName: "balanceOf",
    args: [flowSenderAddress],
  });

  useEffect(() => {
    const dataSuccess = data as any;
    dataSuccess &&
      setBalance(ethers.utils.formatEther(dataSuccess?.toString()).toString());
  }, [isSuccess]);

  async function fetchSteams() {
    const queryBody = `query Steams {
      accounts(where: {id: "${flowSenderAddress.toLowerCase()}"}) {
        id
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
      let data = response.data.accounts[0].outflows;

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

      const filteredData = mergedData.filter((item) => item.flow !== "0");
      setSteams(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSteams();
  }, []);

  useEffect(() => {
    setLoadingSteams(true);
  }, [steams]);

  return (
    <div className="text-center">
      {balance !== undefined && (
        <div className="flex px-10 mt-2 mx-auto flex-col">
          <div>
            <span className="font-bold">Campaign Address: </span>
            <a
              target="_blank"
              href={`https://console.superfluid.finance/matic/accounts/${flowSenderAddress}?tab=streams`}
              className="hover:text-superfluid-100"
            >
              {flowSenderAddress}
            </a>
          </div>
          <div className="flex flex-col mt-9">
            <span className="text-3xl font-semibold text-superfluid-100 ">
              {Number(balance).toFixed(2)} {tokenX}
            </span>
            <span className="font-bold">Total Amount </span>
          </div>
          <div className="grid grid-cols-3 mt-8">
            <div className="flex flex-col font-semibold">
              <span className="text-2xl">{Number(initialFollowers)}</span>
              <span className="text-xl">initial followers</span>
            </div>
            <div className="flex flex-col font-semibold ">
              <span className="text-2xl">
                {Number(profile?.stats.totalFollowers)} ({" "}
                {((Number(profile?.stats.totalFollowers) -
                  Number(initialFollowers)) /
                  Number(profile?.stats.totalFollowers)) *
                  100}
                % )
              </span>
              <span className="text-xl">adquired followers</span>
            </div>
            <div className="flex flex-col font-semibold ">
              <span className="text-2xl">
                {Number(amountFlowRate).toFixed(2)} {tokenX}
              </span>
              <span className="text-xl">price per follower</span>
            </div>
          </div>
          <div className="mt-10">
            {loadingSteams ? (
              <>
                <div className="flex justify-between mb-4 font-semibold">
                  <div className="w-2/3">Your active streams</div>
                  <div className="w-1/3">Amount {tokenX}/month </div>
                </div>
                <div className="border-2 border-superfluid-100 rounded-lg pt-4  overflow-auto h-96">
                  {steams?.map((steam: any, index: number) => {
                    return (
                      <div key={index}>
                        <SteamCard
                          steamAddress={steam.receiver}
                          flowRate={steam.flow}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div>Loading Steams</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
