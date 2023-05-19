import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useProfilesOwnedBy } from "@lens-protocol/react-web";
import { useContractRead } from "wagmi";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import abi from "../../abi/contracts.json";
import { ethers } from "ethers";

interface CampaignShowsInterface {
  flowSenderAddress: string;
  clientAddress: string;
}

export default function CampaignShows({
  flowSenderAddress,
  clientAddress,
}: CampaignShowsInterface) {
  const { data: profiles } = useProfilesOwnedBy({
    address: clientAddress,
  });

  const [balance, setBalance] = useState<string>();
  const { data, isSuccess } = useContractRead({
    address: "0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2",
    abi: abi.abiSuperTokenX,
    functionName: "balanceOf",
    args: [flowSenderAddress],
  });

  useEffect(() => {
    const dataSuccess = data as any;
    setBalance(ethers.utils.formatEther(dataSuccess?.toString()).toString());
  }, [isSuccess]);

  return (
    <>
      {balance !== undefined && (
        <Link href={`/${flowSenderAddress}`} className="py-4 rounded-full my-4">
          {profiles !== undefined && (
            <div className="flex py-4 grid grid-cols-3 text-center">
              <div className="truncate justify-center">
                {profiles[0].handle}
              </div>
              <div className="flex justify-center">
                {Number(balance) >= 0 ? (
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
                  {Number(balance).toFixed(2)} USDCx
                </span>
                <ChevronRightIcon
                  className="h-8 w-8 text-superfluid-100"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </Link>
      )}
    </>
  );
}
