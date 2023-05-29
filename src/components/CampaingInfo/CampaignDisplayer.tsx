import { tokens } from "@/utils/tokens";
import React from "react";
import CampaignShows from "./CampaignShows";

interface CampaignDisplayerInterface {
  isConnected: boolean;
  campaigns: any;
}

export default function CampaignDisplayer({
  isConnected,
  campaigns,
}: CampaignDisplayerInterface) {
  return (
    <div>
      {isConnected && (
        <div>
          {campaigns.length !== 0 ? (
            <div className="h-containerCampaign w-containerCampaign rounded-3xl bg-white mx-auto my-10 overflow-auto">
              <div className="flex justify-center mt-4 flex-col px-10">
                <h2 className="text-2xl mx-auto mt-4 mb-4 text-superfluid-100 leading-8 font-bold">
                  Your Campaign
                </h2>
                <div className="grid grid-cols-3 align-center mb-6">
                  <div className="flex justify-center">Campaign</div>
                  <div className="flex justify-center">Status</div>
                  <div className="flex justify-center">Amount</div>
                </div>
                <div>
                  {campaigns.map((campaign: any, index: number) => {
                    const tokenAddress = tokens.filter(
                      (token) => token.symbol + "x" === campaign.tokenX
                    );
                    return (
                      <div key={index}>
                        {campaign.token !== "USDCx" && (
                          <CampaignShows
                            flowSenderAddress={campaign.flowSenderAddress}
                            clientAddress={campaign.clientAddress}
                            tokenX={campaign.tokenX}
                            tokenAddress={
                              tokenAddress[0].addressX as `0x${string}`
                            }
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-containerCampaignEmpty w-containerCampaign rounded-3xl bg-white mx-auto my-10">
              <div className="flex justify-center mt-4 flex-col px-10">
                <h2 className="text-2xl mx-auto mt-8 mb-2 text-superfluid-100 leading-8 font-bold">
                  Your Campaign
                </h2>
                <div className="text-xl mx-auto mt-6 mb-4 text-superfluid-100 leading-4 font-semibold">
                  Sorry but you have not got campaigns actives!
                </div>
                <div className="text-xl mx-auto  text-superfluid-100 leading-4 font-semibold">
                  Please create a campaign for your Lens profile
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
