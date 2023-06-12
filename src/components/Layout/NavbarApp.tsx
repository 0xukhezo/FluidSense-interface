import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/Iso.svg";
import { Profile } from "../Buttons/Profile";
import { useRouter } from "next/router";

export default function NavbarApp() {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between items-center mx-10 my-4">
      <div className="flex flex-row items-center text-superfluid-100 font-bold">
        <h1 className="text-4xl flex ">
          <Link href="/" className="m-auto flex items-center">
            <Image
              priority
              src={Logo}
              height={64}
              width={70}
              alt="Fluid sense logo"
              className="mx-4"
            />
            <span> FluidSense</span>
          </Link>
        </h1>
        {router.asPath !== "/newCampaign" && (
          <Link href="/newCampaign" className="mr-2 mt-2 ml-6">
            New Campaign
          </Link>
        )}
        {router.asPath !== "/earn" && (
          <Link
            href="/earn"
            className={
              router.asPath !== "/newCampaign" ? "mx-2 mt-2" : "mx-2 mt-2 ml-6"
            }
          >
            Earn
          </Link>
        )}
        {router.asPath !== "/dashboard" && (
          <Link href="/dashboard" className="mx-2 mt-2">
            Dashboard
          </Link>
        )}
      </div>

      <Profile />
    </div>
  );
}
