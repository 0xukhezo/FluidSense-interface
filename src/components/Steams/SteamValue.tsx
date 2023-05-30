import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

interface SteamValueInterface {
  steam: {
    sender: string;
    flow: string;
    time: {
      flowRate: string;
      startedAtTimestamp: string;
      stoppedAtTimestamp: string | null;
    };
    token: string;
  };
  typeOfSteam: string;
  timeOn: number;
}

export default function SteamValue({
  steam,
  typeOfSteam,
  timeOn,
}: SteamValueInterface) {
  const flowInNumber =
    Number(
      ethers.utils.formatUnits(Number(steam.time.flowRate).toString(), "18")
    ) * 2592000;

  const [flow, setFlow] = useState<number>(
    (flowInNumber * timeOn * 12) / 365 / 24 / 60 / 60
  );

  useEffect(() => {
    const flowPerSecond =
      (Number(
        ethers.utils.formatUnits(Number(steam.time.flowRate).toString(), "18")
      ) *
        2592000) /
      365 /
      24 /
      60 /
      5;

    const timer = setInterval(() => {
      setFlow((prevCount: number) => prevCount + flowPerSecond);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="grid grid-cols-4 px-8">
      <span className="col-span-2 text-start">
        <a
          href={`https://console.superfluid.finance/matic/accounts/${steam.sender}?tab=streams`}
          target="_blank"
          className="hover:text-superfluid-100 "
        >
          {steam.sender.slice(0, 5)}...{steam.sender.slice(-4)}
        </a>
      </span>
      <div className="grid grid-cols-2 text-end">
        <span>
          {typeOfSteam === "current"
            ? Number(flow).toFixed(8)
            : (flowInNumber * timeOn) / 365 / 24 / 5 / 60 > 1000
            ? ((flowInNumber * timeOn) / 365 / 24 / 5 / 60).toFixed(2)
            : ((flowInNumber * timeOn) / 365 / 24 / 5 / 60).toFixed(6)}
        </span>{" "}
        <span>{steam.token}</span>
      </div>
      <div className="text-end">{flowInNumber.toFixed(4)} / mo</div>
    </div>
  );
}
