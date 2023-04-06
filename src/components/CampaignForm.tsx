import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import CreateCampaingButton from "./CreateCampaingButton";

export default function CampaignForm() {
  const [clientInfo, setClientInfo] = useState<string>();

  const [amountFlowRate, setAmountFlowRate] = useState<number>();
  const [amountInSMC, setAmountInSMC] = useState<number>();

  const [nextCampaingAddress, setNextCampaingAddress] = useState<string>();
  const campaignsFactoryAddress = "0x90947A7BA76Ca935C5b72ecBC65142758ed0a010";

  const getNonce = async () => {
    const provider = ethers.getDefaultProvider(
      `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_MUMBAI}`
    );
    const _nonce = await provider.getTransactionCount(
      campaignsFactoryAddress,
      "latest"
    );

    return _nonce;
  };

  const getContractAddress = async () => {
    let _nonce = 0;

    _nonce = await getNonce();

    let rlpEncoded = ethers.utils.RLP.encode([
      campaignsFactoryAddress,
      ethers.BigNumber.from(_nonce.toString()).toHexString(),
    ]);
    let contractAddressLong = ethers.utils.keccak256(rlpEncoded);
    let contractAddress = "0x".concat(contractAddressLong.substring(26));

    setNextCampaingAddress(contractAddress);
  };

  const handleAmountFlowRateChange = (val: string) => {
    setAmountFlowRate(Number(val));
  };

  const handleAmountInSMCChange = (val: string) => {
    setAmountInSMC(Number(val));
  };

  const handleClientChange = (e: any) => {
    setClientInfo(e.target.value);
  };

  useEffect(() => {
    getContractAddress();
  }, [clientInfo]);

  return (
    <div className="border-b border-gray-900/10 pb-12 mx-20">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="flow"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Flow in fUSDC
          </label>
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
              className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount in fUSDC
          </label>
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
              className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address with lens profile
          </label>
          <div className="mt-2">
            <input
              placeholder="0x......"
              value={clientInfo}
              onChange={(e) => handleClientChange(e)}
              id="address"
              name="address"
              type="text"
              className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          {nextCampaingAddress !== undefined &&
          amountInSMC !== undefined &&
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
                nextCampaingAddress={nextCampaingAddress}
                amountInSMC={amountInSMC}
                clientInfo={clientInfo}
                amountFlowRate={amountFlowRate}
              />
            )
          ) : (
            <div className="mt-10 flex justify-center ">
              <div className="border-2 border-grey-500 px-4 py-2 rounded-full hover:bg-green-100 h-12 bg-green-50 opacity-25">
                Create Campaign
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
