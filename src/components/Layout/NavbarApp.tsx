import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/Iso.svg";
import { Profile } from "../Buttons/Profile";
import { useRouter } from "next/router";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NavbarApp() {
  const router = useRouter();
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="flex flex-row items-center justify-between mx-10 my-4 items-center">
            <div className="flex justify-between items-center text-superfluid-100 font-bold w-full">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center">
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
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {router.asPath !== "/newCampaign" && (
                    <Link href="/newCampaign" className="mr-2 ml-6">
                      New Campaign
                    </Link>
                  )}
                  {/* {router.asPath !== "/newList" && (
                    <Link href="/newList" className="mr-2 mt-2 ml-6">
                      New List
                    </Link>
                  )} 
                */}
                  {router.asPath !== "/earn" && (
                    <Link
                      href="/earn"
                      className={
                        router.asPath !== "/newCampaign" ? "mx-2" : "mx-2 ml-6"
                      }
                    >
                      Earn
                    </Link>
                  )}
                  {router.asPath !== "/dashboard" && (
                    <Link href="/dashboard">Dashboard</Link>
                  )}
                </div>
              </div>
              <div className="hidden sm:block mr-8">
                <Profile />
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-darkBlue">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as="button"
                className="block border-l-4 border-superfluid-100 bg-superfluid-200 py-2 pl-3 pr-4 text-base font-medium text-superfluid-100 w-full text-start"
              >
                <Profile navbar={true} />
              </Disclosure.Button>
              {router.asPath !== "/newCampaign" && (
                <Disclosure.Button
                  as="a"
                  href="/newCampaign"
                  className="block border-l-4 border-superfluid-100 bg-superfluid-200 py-2 pl-3 pr-4 text-base font-medium text-superfluid-100"
                >
                  New Campaign
                </Disclosure.Button>
              )}
              {router.asPath !== "/earn" && (
                <Disclosure.Button
                  as="a"
                  href="/earn"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Earn
                </Disclosure.Button>
              )}
              {router.asPath !== "/dashboard" && (
                <Disclosure.Button
                  as="a"
                  href="/dashboard"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Dashboard
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
