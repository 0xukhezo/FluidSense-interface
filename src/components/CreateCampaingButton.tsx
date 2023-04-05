import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useProvider } from "wagmi";
import abi from "../../abi/contracts.json";
import listenerForTxMine from "../helpers/listenerForTxMine";

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
  const [onSendClicked, setOnSendClicked] = useState<boolean>(false);

  const amount = ethers.utils.parseEther(amountInSMC.toString());

  const provider = useProvider();

  const { config: createCampaignContractConfig } = usePrepareContractWrite({
    address: "0x9Eb19d1A3D7bb955A81a5e246aa0f524d835CA59",
    abi: abi.abiCampaignFactory,
    functionName: "deployCampaign",
    args: ["0xa8EC796eE75B04af1223445c587588181CEb56CD"],
  });

  const { config: transferTokensContractConfig } = usePrepareContractWrite({
    address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
    abi: abi.abiFUSDC,
    functionName: "transfer",
    args: [nextCampaingAddress, amount],
  });

  const { writeAsync: transferTokensContractTx } = useContractWrite(
    transferTokensContractConfig
  );
  const { writeAsync: createCampaignContractTx } = useContractWrite(
    createCampaignContractConfig
  );

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

  useEffect(() => {
    fetchProfiles("ownedBy");
  }, []);

  useEffect(() => {
    setBody(
      JSON.stringify({
        clientProfile: lensProfile?.id,
        clientAddress: clientInfo,
        flowSenderAddress: nextCampaingAddress,
        followNftAddress: lensProfile?.followNftAddress,
        amountFlowRate: Number(amountFlowRate),
      })
    );
  }, [lensProfile]);

  async function postClient() {
    console.log(body);
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
      const txResponseCreateFlowSender = await transferTokensContractTx?.();
      await listenerForTxMine(
        txResponseCreateFlowSender?.hash,
        provider,
        "transfer"
      );
      setOnSendClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateClick = async () => {
    try {
      const txResponseCampaignSender = await createCampaignContractTx?.();
      await listenerForTxMine(
        txResponseCampaignSender?.hash,
        provider,
        "Create Campaign"
      );
      postClient();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {noLensProfile ? (
        <div>This address is not owner of a Lens Profile</div>
      ) : !onSendClicked ? (
        <div className="mt-10 flex justify-center ">
          <button
            onClick={() => onSendClick()}
            className="border-2 border-grey-500 px-4 py-2 rounded-full hover:bg-green-100 h-12 bg-green-50"
          >
            Send tokens
          </button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center ">
          <button
            onClick={() => onCreateClick()}
            className="border-2 border-grey-500 px-4 py-2 rounded-full hover:bg-green-100 h-12 bg-green-50"
          >
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );
}
