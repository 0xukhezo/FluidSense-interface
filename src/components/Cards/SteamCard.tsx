import React, { useEffect, useState } from "react";
import { client, Profiles } from "@/pages/api/Profile";

interface SteamCardInterface {
  steamAddress: `0x${string}`;
  flowRate: string;
}

export default function SteamCard({
  steamAddress,
  flowRate,
}: SteamCardInterface) {
  const [profile, setProfile] = useState<string>();
  const [index, setIndex] = useState<number>();

  async function fetchProfiles() {
    const queryBody = `query Profiles {
      profiles(request: { ownedBy: ["${steamAddress}"], limit: 1 }) {
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
      const index = response.data.profiles.items[0].handle.indexOf(".");
      setIndex(index);
      setProfile(response.data.profiles.items[0].handle);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="my-6 text-start flex justify-between border-b-superfluid-100 border-b-2 mx-6 py-2">
      {profile ? (
        <a
          className="mx-4"
          target="_blank"
          href={`https://lenster.xyz/u/${profile.slice(0, index)}`}
        >
          {profile}
        </a>
      ) : (
        <div className="mx-4">{steamAddress}</div>
      )}
      <div className="mr-16">
        {(Number(flowRate) / 380551219200).toFixed(4)} / mo
      </div>
    </div>
  );
}
