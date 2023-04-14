import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { watchContractEvent } from "@wagmi/core";
import abi from "../../abi/contracts.json";

import { client, Profiles } from "../pages/api/Profile";
import Alert from "./Alerts/Alert";

interface EventIdInputInterface {
  amountInSMC: number;
  amountFlowRate: number;
  clientInfo: string;
  isHuman: boolean;
}

export default function CreateCampaingButton({
  amountInSMC,
  amountFlowRate,
  clientInfo,
  isHuman,
}: EventIdInputInterface) {
  const [lensProfile, setLensProfile] = useState<any>();
  const [body, setBody] = useState<any>();
  const [type, setType] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [campaign, setCampaing] = useState<string>();
  const [noLensProfile, setNoLensProfile] = useState<boolean>(false);
  const [hash, setHash] = useState<string>();

  const campaignsFactoryAddress = "0xA061D7Fc57e5155b1a71DCC9c8f48AF3830244C9";

  const amount = ethers.utils.parseEther(amountInSMC.toString()).toString();

  const unwatch = watchContractEvent(
    {
      address: campaignsFactoryAddress,
      abi: abi.abiCampaignFactory,
      eventName: "NewCampaign",
    },
    (campaign: any) => {
      setCampaing(campaign);
    }
  );

  const { config: createCampaignContractConfig } = usePrepareContractWrite({
    address: campaignsFactoryAddress,
    abi: abi.abiCampaignFactory,
    functionName: "deployCampaign",
    args: [amount],
  });

  const { config: approveTokensContractConfig } = usePrepareContractWrite({
    address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
    abi: abi.abiFUSDC,
    functionName: "approve",
    args: [campaignsFactoryAddress, amount],
  });

  const { writeAsync: ApproveTokensContractTx, data: dataApprove } =
    useContractWrite(approveTokensContractConfig);
  const { writeAsync: createCampaignContractTx, data: dataCampaign } =
    useContractWrite(createCampaignContractConfig);

  const {
    data: txReceiptApprove,
    isSuccess: txSuccessApprove,
    isError: txErrorApprove,
    isLoading: txLoadingApprove,
  } = useWaitForTransaction({
    confirmations: 10,
    hash: dataApprove?.hash,
  });

  const {
    isSuccess: txSuccessCampaign,
    isError: txErrorCampaign,
    isLoading: txLoadingCampaign,
  } = useWaitForTransaction({
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
          onChainIdentity{
            ens{
              name
              __typename
            }
            proofOfHumanity
            __typename
            worldcoin{
              isHuman
              __typename
            }
            sybilDotOrg{
              source{
                __typename
              }
              __typename
              verified
            }
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
      await ApproveTokensContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateClick = async () => {
    try {
      await createCampaignContractTx?.();
      unwatch();
    } catch (error) {
      console.log(error);
    }
  };

  const getCloseAlert = (closeAlert: boolean) => {
    closeAlert && setMessage(undefined);
  };

  useEffect(() => {
    if (clientInfo.slice(0, 2) === "0x") {
      fetchProfiles("ownedBy");
    }
    if (clientInfo.slice(-5) === ".lens") {
      fetchProfiles("handles");
    }
  }, []);

  useEffect(() => {
    setNoLensProfile(false);
    if (clientInfo.slice(0, 2) === "0x") {
      fetchProfiles("ownedBy");
    }
    if (clientInfo.slice(-5) === ".lens") {
      fetchProfiles("handles");
    }
  }, [clientInfo]);

  useEffect(() => {
    setBody(
      JSON.stringify({
        clientProfile: lensProfile?.id.toString(),
        clientAddress: lensProfile?.ownedBy.toString(),
        flowSenderAddress: campaign,
        followNftAddress: lensProfile?.followNftAddress,
        amountFlowRate: Number(amountFlowRate),
        isHuman: isHuman,
      })
    );
  }, [lensProfile]);

  useEffect(() => {
    if (txLoadingApprove || txLoadingCampaign) {
      if (txLoadingApprove) {
        setHash(dataApprove?.hash);
      } else {
        setHash(dataCampaign?.hash);
      }
      setType("loading");
      setMessage(
        "Your transaction is being processed, don't close or reload the page!"
      );
    }
  }, [txLoadingApprove, txLoadingCampaign]);

  useEffect(() => {
    if (txSuccessApprove || txSuccessCampaign) {
      if (txSuccessApprove) {
        setHash(dataApprove?.hash);
        setType("success");
        setMessage("USDC approved!");
      }
      if (txSuccessCampaign) {
        setHash(dataCampaign?.hash);
        setType("success");
        setMessage("Your campaign has been successfully created!");
      }
    }
  }, [txSuccessCampaign, txSuccessApprove]);

  useEffect(() => {
    if (txErrorCampaign || txErrorApprove) {
      if (txErrorApprove) {
        setHash(dataApprove?.hash);
      } else {
        setHash(dataCampaign?.hash);
      }
      setType("fail");
      setMessage("Your transaction failed");
    }
  }, [txErrorCampaign, txErrorApprove]);

  useEffect(() => {
    if (txSuccessCampaign) {
      postClient();
    }
  }, [txSuccessCampaign]);

  return (
    <>
      <div>
        {type !== undefined && message !== undefined && (
          <Alert
            type={type}
            message={message}
            getCloseAlert={getCloseAlert}
            hash={hash}
          />
        )}
        {noLensProfile ? (
          <Alert
            type={"fail"}
            message={"This address is not owner of a Lens Profile"}
            getCloseAlert={getCloseAlert}
          />
        ) : txReceiptApprove === undefined && amount !== undefined ? (
          amountInSMC === 0 || amountFlowRate === 0 ? (
            <div className="mt-5 flex justify-center ">
              <div className="px-20 py-5 rounded-full text-gray-600 bg-gray-200 leading-8 font-bold opacity-50 tracking-wide">
                Approve USDC
              </div>
            </div>
          ) : (
            <div className="mt-5 flex justify-center ">
              <button
                onClick={() => onSendClick()}
                className=" px-20 py-5 rounded-full bg-superfluid-100 leading-8 font-bold tracking-wide"
              >
                Approve USDC
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
