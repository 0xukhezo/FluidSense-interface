import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CampaingCardTeam from "@/components/Cards/CampaingCardTeam";
import NavbarApp from "@/components/Layout/NavbarApp";

type Campaign = {
  amount: number;
  amountFlowRate: number;
  clientAddress: string;
  clientProfile: string;
  flowSenderAddress: string;
  followNftAddress: string;
  idclients: number;
  isHuman: number;
  owner: string;
  publicationId: string;
  tokenX: string;
  totalFollowers: number | null;
};

export default function DashboardTeam() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [columnOrder, setColumnOrder] = useState<keyof Campaign>("amount");

  async function getCampaigns() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API as string);
      if (!response.ok) {
        throw new Error("Bad response from server");
      }
      const data = await response.json();
      setCampaigns(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  const sortCampaigns = (parametro: keyof Campaign) => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      const valueA = a[parametro];
      const valueB = b[parametro];

      if (valueA === null || valueB === null) {
        // Manejar casos donde el valor es null
        return 0; // O establece una lógica específica para manejar los null
      }

      if (valueA > valueB) {
        return -1;
      } else if (valueA < valueB) {
        return 1;
      } else {
        return 0;
      }
    });
    setCampaigns(sortedCampaigns);
    setColumnOrder(parametro);
  };

  return (
    <div className="bg-[url('../../public/bg1.jpg')] h-screen bg-no-repeat bg-center bg-cover pt-4 overflow-auto ">
      <NavbarApp />
      <div className="flex justify-center flex-col mb-10 mt-16">
        <div className="rounded-3xl bg-white mx-4 overflow-auto max-h-[800px] text-center">
          <div className="grid grid-cols-12 py-6 border-b-superfluid-100 border-b-2">
            <div className="flex flex-row items-center justify-center">
              <span>Status </span>
              {/* <ChevronDownIcon height={20} width={20} /> */}
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Amount in </span>
              {/* <button onClick={() => sortCampaigns("amount")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button> */}
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Token X </span>
              <button onClick={() => sortCampaigns("tokenX")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Campaign </span>
              <button onClick={() => sortCampaigns("flowSenderAddress")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>End Date </span>
              {/* <ChevronDownIcon height={20} width={20} />{" "} */}
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Lens profile </span>
              <button onClick={() => sortCampaigns("clientProfile")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Flow </span>
              <button onClick={() => sortCampaigns("amountFlowRate")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Post ID </span>
              <button onClick={() => sortCampaigns("publicationId")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Inicial Followers </span>
              <button onClick={() => sortCampaigns("totalFollowers")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span>Current Followers </span>
              {/* <button onClick={() => sortCampaigns("tokenX")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button> */}
            </div>
            <div className="flex flex-row items-center justify-center col-span-2">
              <span>Gained Followers </span>
              {/* <button onClick={() => sortCampaigns("tokenX")}>
                <ChevronDownIcon height={20} width={20} />{" "}
              </button> */}
            </div>
          </div>
          <div className="flex grid grid-rows">
            {campaigns?.map((campaign: Campaign, index: number) => {
              return (
                <div key={index}>
                  <CampaingCardTeam campaign={campaign} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
