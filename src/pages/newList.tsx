import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import CampaignDisplayer from "@/components/CampaingInfo/CampaignDisplayer";
import NavbarApp from "@/components/Layout/NavbarApp";
import ListForm from "@/components/Form/ListForm";

export default function NewList() {
  const { address, isConnected } = useAccount();
  const [lists, setLists] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getClients() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_LISTS as string)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json();
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
      const listsOwned = response.filter((list: any) => list.owner === address);
      setLists(listsOwned);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getClients();
  }, [isConnected]);

  useEffect(() => {
    setLoading(true);
  }, [lists]);

  return (
    <div className="bg-[url('../../public/bg1.jpg')] h-screen bg-no-repeat bg-center bg-cover pt-4 overflow-auto">
      <NavbarApp />
      <div className="flex justify-center flex-col mb-10">
        <div className="h-fit w-container rounded-3xl bg-white mx-auto pb-6">
          <div className="flex justify-center mt-6 flex-col">
            <h2 className="text-2xl mx-auto my-2 text-superfluid-100 leading-8 font-bold">
              Set up your campaign
            </h2>
            <ListForm />
          </div>
        </div>
        {/* {loading ? (
          <ListsDisplayer isConnected={isConnected} lists={lists} />
        ) : (
          <div className="h-containerCampaign w-containerCampaign rounded-3xl bg-white mx-auto my-10 overflow-auto">
            <div className="flex justify-center mt-4 flex-col px-10">
              <h2 className="text-2xl mx-auto mt-4 mb-4 text-superfluid-100 leading-8 font-bold">
                Your Lists
              </h2>
              <div className="grid grid-cols-3 align-center mb-6">
                <div className="flex justify-center">Campaign</div>
                <div className="flex justify-center">Status</div>
                <div className="flex justify-center">Amount</div>
              </div>
              <div>Loading Lists</div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
