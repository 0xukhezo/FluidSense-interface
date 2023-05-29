import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useProfilesOwnedBy } from "@lens-protocol/react-web";
import { useContractRead } from "wagmi";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import abi from "../../../abi/contracts.json";
import { ethers } from "ethers";
import { tokens } from "@/utils/tokens";

interface CampaignShowsInterface {
  flowSenderAddress: string;
  clientAddress: string;
  tokenX: string;
  tokenAddress: `0x${string}`;
}

export default function CampaignShows({
  flowSenderAddress,
  clientAddress,
  tokenX,
  tokenAddress,
}: CampaignShowsInterface) {
  const { data: profiles } = useProfilesOwnedBy({
    address: clientAddress,
  });
  const [balance, setBalance] = useState<string>();

  const { data, isSuccess } = useContractRead({
    address: tokenAddress,
    abi: abi.abiSuperTokenX,
    functionName: "balanceOf",
    args: [flowSenderAddress],
  });

  useEffect(() => {
    const dataSuccess = data as any;
    dataSuccess !== undefined &&
      setBalance(ethers.utils.formatEther(dataSuccess?.toString()).toString());
  }, [isSuccess]);

  return (
    <>
      {balance !== undefined && (
        <Link href={`/${flowSenderAddress}`}>
          {profiles !== undefined && (
            <div className="flex py-4 grid grid-cols-3 text-center border-2 border-superfluid-100 my-3 rounded-full hover:bg-superfluid-200">
              <div className="truncate justify-center font-semibold">
                {profiles[0].handle}
              </div>
              <div className="flex justify-center">
                {Number(balance) !== 0.0 ? (
                  <div className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Active
                  </div>
                ) : (
                  <div className="font-bold text-gray-400 bg-clip-text">
                    Expired
                  </div>
                )}
              </div>
              <div className="flex justify-between font-bold text-superfluid-100">
                <span className="pl-20">
                  {Number(balance).toFixed(2)} {tokenX}
                </span>
              </div>
            </div>
          )}
        </Link>
      )}
    </>
  );
}
