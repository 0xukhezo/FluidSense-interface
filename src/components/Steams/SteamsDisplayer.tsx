import React from "react";

import SteamValue from "./SteamValue";

interface SteamsDisplayerInterface {
  steams: {
    sender: string;
    flow: string;
    time: {
      flowRate: string;
      startedAtTimestamp: string;
      stoppedAtTimestamp: string | null;
    };
    token: string;
  }[];
  typeOfSteam: string;
}

type Steam = {
  sender: string;
  flow: string;
  time: {
    flowRate: string;
    startedAtTimestamp: string;
    stoppedAtTimestamp: string | null;
  };
  token: string;
};

export default function SteamsDisplayer({
  steams,
  typeOfSteam,
}: SteamsDisplayerInterface) {
  const currentTimestampInSeconds: number = Math.floor(Date.now() / 1000);

  return (
    <div className="xl:px-10 overflow-auto">
      <div className="grid grid-cols-4 text-end px-14 py-2 border-b-1 border-b-superfluid-100">
        <div className="col-span-2 text-start">Sender</div>
        <div className="text-center">All time flow</div>
        <div>Flow Rate</div>
      </div>
      {steams.map((steam: Steam, index: number) => {
        return (
          <div
            key={index}
            className="hover:bg-superfluid-200 py-4 px-6 rounded-lg"
          >
            <SteamValue
              steam={steam}
              typeOfSteam={typeOfSteam}
              timeOn={
                typeOfSteam === "current"
                  ? currentTimestampInSeconds -
                    Number(steam.time.startedAtTimestamp)
                  : Number(steam.time.stoppedAtTimestamp) -
                    Number(steam.time.startedAtTimestamp)
              }
            />
          </div>
        );
      })}
    </div>
  );
}
