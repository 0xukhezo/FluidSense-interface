import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";

import LogoName from "../../../public/LogoName.svg";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-32 bg-darkBlue pt-4 flex justify-between sm:block">
            <div className="flex items-center justify-between h-16 ">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Image
                    priority
                    src={LogoName}
                    height={61}
                    width={300}
                    alt="Fluid sense logo"
                    className="block h-8 w-auto lg:hidden"
                  />
                </Link>
                <Link href="/">
                  <Image
                    priority
                    src={LogoName}
                    height={61}
                    width={300}
                    alt="Fluid sense logo"
                    className="hidden h-8 w-auto lg:block"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/about"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-superfluid-100 hover:border-superfluid-100"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-superfluid-100 hover:border-superfluid-100"
                >
                  Contact
                </Link>

                <Link
                  href="/newCampaign"
                  className="font-semibold text-black px-10 py-4 rounded-full h-12 bg-superfluid-100 flex items-center leading-6 z-10"
                >
                  Launch App
                </Link>
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
                as="a"
                href="/about"
                className="block border-l-4 border-superfluid-100 bg-superfluid-200 py-2 pl-3 pr-4 text-base font-medium text-superfluid-100"
              >
                About
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/contact"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Contact
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/newCampaign"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Launch App
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
