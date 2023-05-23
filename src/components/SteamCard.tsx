import React from "react";
import { useEnsName } from "wagmi";

interface SteamCardInterface {
  steamAddress: `0x${string}`;
  flowRate: string;
}

export default function SteamCard({
  steamAddress,
  flowRate,
}: SteamCardInterface) {
  const { data } = useEnsName({
    address: steamAddress,
    chainId: 1,
  });

  return (
    <div className="my-6 text-start flex justify-between border-b-superfluid-100 border-b-2 mx-6 py-2">
      <div className="mx-4">{data ? data : steamAddress}</div>
      <div className="mr-16">
        {(Number(flowRate) / 380551219200).toFixed(4)} / mo
      </div>
    </div>
  );
}
