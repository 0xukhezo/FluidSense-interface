import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

import SteamsDisplayer from "@/components/Steams/SteamsDisplayer";

import { clientSuperfluid, Superfluid } from "@/pages/api/Superfluid";
import NavbarApp from "@/components/Layout/NavbarApp";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [currentSteams, setCurrentSteams] = useState<any[]>();
  const [pastSteams, setPastSteams] = useState<any[]>();
  const [inputAddress, setInputAddress] = useState<string>();
  const [check, setCheck] = useState<boolean>(false);

  async function fetchSteams() {
    const wallet = inputAddress ? inputAddress : address;
    if (!wallet) return;
    const queryBody = `query MyQuery {
        account(id: "${wallet!.toLowerCase()}") {
            id
            inflows {
                sender {
                id
                }
                currentFlowRate
                token {
                symbol
                }
                streamPeriods {
                flowRate
                stoppedAtTimestamp
                startedAtTimestamp
                }
            }
        }
      }`;

    try {
      let response = await clientSuperfluid.query({
        query: Superfluid(queryBody),
      });

      let data = response.data.account.inflows;

      const steams: string[] = [];
      const flows: number[] = [];
      const time: number[] = [];
      const token: number[] = [];

      for (var i = 0; i < data.length; i++) {
        const elemento = data[i].sender.id;
        const currentFlowRate = data[i].currentFlowRate;

        if (!steams.includes(data[i].sender.id)) {
          steams.push(elemento);
          flows.push(currentFlowRate);
          time.push(data[i].streamPeriods[0]);
          token.push(data[i].token.symbol);
        }
      }

      const mergedData = steams.reduce(
        (result: any, sender: any, index: number) => {
          return [
            ...result,
            {
              sender,
              flow: flows[index],
              time: time[index],
              token: token[index],
            },
          ];
        },
        []
      );

      const currentSteams = mergedData.filter((item) => item.flow !== "0");
      const pastSteams = mergedData.filter((item) => item.flow === "0");

      setCurrentSteams(currentSteams);
      setPastSteams(pastSteams);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSteams();
  }, [address, inputAddress]);

  const handleInputAddress = (e: any) => {
    setInputAddress(e);
  };

  const checkClick = () => {
    setCheck(true);
  };

  return (
    <div className="bg-[url('../../public/bg1.jpg')] h-screen bg-no-repeat bg-center bg-cover pt-4 overflow-auto">
      <NavbarApp />
      <div className="flex justify-center flex-col mb-10">
        <div className="h-container xl:w-container rounded-3xl bg-white mx-4 xl:mx-auto overflow-auto">
          <div className="flex justify-center mt-6 flex-col">
            {(isConnected &&
              address &&
              check &&
              currentSteams !== undefined &&
              pastSteams !== undefined) ||
            (check &&
              currentSteams !== undefined &&
              pastSteams !== undefined) ? (
              <div className="my-[50px] text-center">
                <h2 className="text-2xl mx-auto my-2 text-superfluid-100 leading-8 font-bold">
                  Current Steams
                </h2>
                <SteamsDisplayer steams={currentSteams} typeOfSteam="current" />
                <h2 className="text-2xl mx-auto my-2 text-superfluid-100 leading-8 font-bold">
                  Past Steams
                </h2>
                <SteamsDisplayer steams={pastSteams} typeOfSteam="past" />
              </div>
            ) : (
              <>
                <div className="xl:px-20">
                  <label
                    htmlFor="amount"
                    className="block text-xl font-bold leading-6 text-gray-900 pb-2 mt-[50px] px-10"
                  >
                    Address
                  </label>
                  <div className="text-base leading-5 pb-2 px-10">
                    Write the address to find all the steams it has from
                    campaigns!
                  </div>
                  <div className="mt-2 px-10 ">
                    <input
                      value={inputAddress}
                      onChange={(e) => handleInputAddress(e.target.value)}
                      step="any"
                      type="string"
                      name="inputAddress"
                      id="inputAddress"
                      className="px-4 block w-full rounded-md border-1 border-superfluid-100 py-1.5 shadow-sm sm:text-sm sm:leading-6 focus:outline-none focus:ring-1 focus:ring-superfluid-100"
                    />
                  </div>
                </div>
                <div className="mt-2 flex justify-center ">
                  <button
                    onClick={() => checkClick()}
                    className="mt-[25px] px-10 py-2 rounded-full bg-superfluid-100 leading-8 font-bold tracking-wide"
                  >
                    Go!
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
