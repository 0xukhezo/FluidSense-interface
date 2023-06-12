import React from "react";
import Image from "next/image";

import Navbar from "../Layout/Navbar";

export default function SectionHeader() {
  return (
    <div className="bg-[url('../../public/bg2.jpg')] bg-no-repeat bg-center bg-cover min-h-[814px]">
      <Navbar />
      <div className="flex flex-row lg:px-32 px-10">
        <div className="felx flex-col max-w-[593px] pt-[79px]">
          <h1 className="text-superfluid-100 lg:text-7xl text-3xl font-semibold">
            Promote your content on web3 social platforms
          </h1>
          <div className="text-white text-xl mt-[26px] mb-[31px]">
            Get more sales, collects, followers and comments by boosting your
            content. Reward your loyal community through fluid payments for
            spreading your content and making you trend.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <button className="text-xl font-semibold text-black lg:px-10 py-4 rounded-full  bg-superfluid-100 flex items-center leading-6 lg:min-w-[250px] lg:min-h-[80px] justify-center max-w-[250px]">
              Let <span>{"'"}</span>s go!
            </button>
            <button className="mt-6 md:mt-0 md:ml-10 text-xl border-1 border-superfluid-100 text-superfluid-100 py-4 rounded-full bg-superfluid-200 flex items-center font-bold text-xl leading-6 lg:min-w-[250px] lg:min-h-[52px] justify-center max-w-[250px]">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
