import React, { useState } from "react";

import CreateCampaingButton from "./CreateCampaingButton";

export default function CampaignForm() {
  const [clientInfo, setClientInfo] = useState<string>();

  const [amountFlowRate, setAmountFlowRate] = useState<number>();
  const [amountInSMC, setAmountInSMC] = useState<number>();

  const handleAmountFlowRateChange = (val: string) => {
    setAmountFlowRate(Number(val));
  };

  const handleAmountInSMCChange = (val: string) => {
    setAmountInSMC(Number(val));
  };

  const handleClientChange = (e: any) => {
    setClientInfo(e.target.value);
  };

  return (
    <div className="mx-14">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="flow"
            className="block text-xl font-bold leading-6 text-gray-900 pb-2"
          >
            Flow in fUSDC
          </label>
          <div className="text-base leading-5 pb-2">
            Define how much each user will get with your campaign.
          </div>
          <div className="mt-2">
            <input
              value={amountFlowRate}
              onChange={(e) => handleAmountFlowRateChange(e.target.value)}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              step="any"
              type="number"
              name="flow"
              id="flow"
              autoComplete="given-name"
              className="px-4 block w-full rounded-md border-1 border-superfluid-100 py-1.5 text-superfluid-100 shadow-sm placeholder:text-superfluid-100 sm:text-sm sm:leading-6 focus:outline-none focus:ring-1 focus:ring-superfluid-100"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="amount"
            className="block text-xl font-bold leading-6 text-gray-900 pb-2"
          >
            Amount in fUSDC
          </label>
          <div className="text-base leading-5 pb-2">
            Define the total investment for your campaign.
          </div>
          <div className="mt-2">
            <input
              value={amountInSMC}
              onChange={(e) => handleAmountInSMCChange(e.target.value)}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              step="any"
              type="number"
              name="amount"
              id="amount"
              autoComplete="family-name"
              className="px-4 block w-full rounded-md border-1 border-superfluid-100 py-1.5 text-superfluid-100 shadow-sm placeholder:text-superfluid-100 sm:text-sm sm:leading-6 focus:outline-none focus:ring-1 focus:ring-superfluid-100"
            />
          </div>
        </div>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="address"
            className="block text-xl font-bold leading-6 text-gray-900 pb-2"
          >
            Address with Lens profile
          </label>
          <div className="text-base leading-5 pb-2">
            Provide the address of the Lens Profile that will be used in the
            campaign.
          </div>
          <div className="mt-2">
            <input
              placeholder="0x......"
              value={clientInfo}
              onChange={(e) => handleClientChange(e)}
              id="address"
              name="address"
              type="text"
              className="px-4 block w-full rounded-md border-1 border-superfluid-100 py-1.5 text-superfluid-100 shadow-sm placeholder:text-superfluid-100 sm:text-sm sm:leading-6 focus:outline-none focus:ring-1 focus:ring-superfluid-100"
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          {amountInSMC !== undefined &&
          amountFlowRate !== undefined &&
          clientInfo !== undefined ? (
            amountInSMC < 0 && amountFlowRate < 0 ? (
              <div className="mt-10 flex justify-center ">
                <div className="text-red-500">
                  You need enter a positive flow and amount
                </div>
              </div>
            ) : (
              <CreateCampaingButton
                amountInSMC={amountInSMC}
                clientInfo={clientInfo}
                amountFlowRate={amountFlowRate}
              />
            )
          ) : (
            <div className="mt-5 flex justify-center ">
              <div className="px-20 py-5 rounded-full text-gray-600 bg-gray-200 leading-8 font-bold opacity-50 tracking-wide">
                Approve USDC
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
