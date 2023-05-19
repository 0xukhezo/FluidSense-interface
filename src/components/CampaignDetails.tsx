import React, { useState, useEffect } from "react";

import { useContractRead } from "wagmi";

import abi from "../../abi/contracts.json";
import { ethers } from "ethers";

interface CampaignDetailsInterface {
  amount: number;
  flowSenderAddress: string;
  amountFlowRate: number;
  token: string;
}

export default function CampaignDetails({
  amount,
  flowSenderAddress,
  amountFlowRate,
  token,
}: CampaignDetailsInterface) {
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
    <div className="text-center">
      {balance !== undefined && (
        <div className="flex px-10 mt-2 mx-auto flex-col">
          <div>
            <span className="font-bold">Campaign Address: </span>
            {flowSenderAddress}
          </div>
          <div className="flex flex-col mt-9">
            <span className="text-3xl font-semibold text-superfluid-100 ">
              {Number(balance).toFixed(2)} {token}{" "}
            </span>
            <span className="font-bold">Total Amount </span>
          </div>
          <div className="grid grid-cols-3 mt-8">
            <div className="flex flex-col text-semibold text-xl">
              <span className="text-bold">120</span>
              <span>initial followers</span>
            </div>
            <div className="flex flex-col text-semibold text-xl">
              <span className="text-bold">20 (12%)</span>
              <span>adquired followers</span>
            </div>
            <div className="flex flex-col text-semibold text-xl">
              <span className="text-bold">
                {amountFlowRate} {token}
              </span>
              <span>price per follower</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
