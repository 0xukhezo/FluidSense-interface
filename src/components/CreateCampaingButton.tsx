import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../../abi/contracts.json";

import { client, Profiles } from "../pages/api/Profile";

interface EventIdInputInterface {
  nextCampaingAddress: string;
  amountInSMC: number;
  amountFlowRate: number;
  clientInfo: string;
}

export default function CreateCampaingButton({
  nextCampaingAddress,
  amountInSMC,
  amountFlowRate,
  clientInfo,
}: EventIdInputInterface) {
  const [lensProfile, setLensProfile] = useState<any>();
  const [body, setBody] = useState<any>();
  const [noLensProfile, setNoLensProfile] = useState<boolean>(false);

  const amount = ethers.utils.parseEther(amountInSMC.toString());

  const { config: createCampaignContractConfig } = usePrepareContractWrite({
    address: "0x90947A7BA76Ca935C5b72ecBC65142758ed0a010",
    abi: abi.abiCampaignFactory,
    functionName: "deployCampaign",
    args: [],
  });

  const { config: transferTokensContractConfig } = usePrepareContractWrite({
    address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
    abi: abi.abiFUSDC,
    functionName: "transfer",
    args: [nextCampaingAddress, amount],
  });

  const { writeAsync: transferTokensContractTx, data: dataTransfer } =
    useContractWrite(transferTokensContractConfig);
  const { writeAsync: createCampaignContractTx, data: dataCampaign } =
    useContractWrite(createCampaignContractConfig);

  const { data: txReceiptTransfer, isSuccess: txSuccessTransfer } =
    useWaitForTransaction({
      confirmations: 10,
      hash: dataTransfer?.hash,
    });

  const { isSuccess: txSuccessCampaign } = useWaitForTransaction({
    confirmations: 2,
    hash: dataCampaign?.hash,
  });

  async function fetchProfiles(typeQuery: string) {
    const queryBody = `query Profiles {
      profiles(request: { ${typeQuery}: ["${clientInfo}"], limit: 1 }) {
        items {
          id
          interests
          name
          bio
          attributes {
            displayType
            traitType
            key
            value
          }
          followNftAddress
          metadata
          isDefault
          picture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
          handle
          coverPicture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
          ownedBy
          dispatcher {
            address
            canUseRelay
          }
          stats {
            totalFollowers
            totalFollowing
            totalPosts
            totalComments
            totalMirrors
            totalPublications
            totalCollects
          }
          followModule {
            ... on FeeFollowModuleSettings {
              type
              amount {
                asset {
                  symbol
                  name
                  decimals
                  address
                }
                value
              }
              recipient
            }
            ... on ProfileFollowModuleSettings {
             type
            }
            ... on RevertFollowModuleSettings {
             type
            }
          }
        }
        pageInfo {
          prev
          next
          totalCount
        }
      }
    }`;

    try {
      let response = await client.query({ query: Profiles(queryBody) });
      let profileData = await Promise.all(
        response.data.profiles.items.map(async (profileInfo: any) => {
          let profile = { ...profileInfo };
          let picture = profile.picture;
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith("ipfs://")) {
              let result = picture.original.url.substring(
                7,
                picture.original.url.length
              );
              profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
            } else {
              profile.avatarUrl = picture.original.url;
            }
          }
          return profile;
        })
      );
      if (profileData[0] === undefined) {
        setNoLensProfile(true);
      } else {
        setLensProfile(profileData[0]);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function postClient() {
    try {
      const response = await fetch(
        "https://qfgg4yahcg.execute-api.eu-north-1.amazonaws.com/fluidSense/clients",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: body,
          mode: "no-cors" as RequestMode,
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.log(err);
    }
  }

  const onSendClick = async () => {
    try {
      await transferTokensContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateClick = async () => {
    try {
      await createCampaignContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles("ownedBy");
  }, []);

  useEffect(() => {
    if (txSuccessCampaign) {
      postClient();
    }
  }, [txSuccessCampaign]);

  useEffect(() => {
    setNoLensProfile(false);
    fetchProfiles("ownedBy");
  }, [clientInfo]);

  useEffect(() => {
    setBody(
      JSON.stringify({
        clientProfile: lensProfile?.id.toString(),
        clientAddress: clientInfo,
        flowSenderAddress: nextCampaingAddress,
        followNftAddress: lensProfile?.followNftAddress,
        amountFlowRate: Number(amountFlowRate),
      })
    );
  }, [lensProfile]);

  return (
    <>
      <div>
        {noLensProfile ? (
          <div>This address is not owner of a Lens Profile</div>
        ) : txReceiptTransfer === undefined && amount !== undefined ? (
          amountInSMC === 0 || amountFlowRate === 0 ? (
            <div className="mt-5 flex justify-center ">
              <div className="px-20 py-5 rounded-full text-gray-600 bg-gray-200 leading-8 font-bold opacity-50 tracking-wide">
                Send tokens
              </div>
            </div>
          ) : (
            <div className="mt-5 flex justify-center ">
              <button
                onClick={() => onSendClick()}
                className=" px-20 py-5 rounded-full bg-superfluid-100 leading-8 font-bold tracking-wide"
              >
                Send Tokens
              </button>
            </div>
          )
        ) : amountInSMC === 0 || amountFlowRate === 0 ? (
          <div className="mt-5 flex justify-center ">
            <div className="px-20 py-5 rounded-full text-gray-600 bg-gray-200 leading-8 font-bold opacity-50 tracking-wide">
              Create Campaign
            </div>
          </div>
        ) : (
          <div className="mt-5 flex justify-center ">
            <button
              onClick={() => onCreateClick()}
              className=" px-20 py-5 rounded-full bg-superfluid-100 leading-8 font-bold tracking-wide"
            >
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </>
  );
}
