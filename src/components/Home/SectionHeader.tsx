import React from "react";
import Image from "next/image";

import Rocket from "../../../public/rocket.png";
import Navbar from "../Layout/Navbar";

export default function SectionHeader() {
  return (
    <div className="bg-[url('../../public/bg2.jpg')] bg-no-repeat bg-center bg-cover min-h-[814px]">
      <Navbar />
      <div className="flex flex-row px-32">
        <div className="felx flex-col max-w-[593px] pt-[79px]">
          <h1 className="text-superfluid-100 text-7xl font-semibold">
            Promote your content on web3 social platforms
          </h1>
          <div className="text-white text-xl mt-[26px] mb-[31px]">
            Get more sales, collects, followers and comments by boosting your
            content. Reward your loyal community through fluid payments for
            spreading your content and making you trend.
          </div>
          <div className="flex flex-row justify-between">
            <button className="text-xl font-semibold text-black px-10 py-4 rounded-full h-12 bg-superfluid-100 flex items-center leading-6 min-w-[250px] min-h-[80px] justify-center">
              Let's go!
            </button>
            <button className="text-xl border-1 border-superfluid-100 text-superfluid-100 px-5 py-4 rounded-full h-12 bg-superfluid-200 flex items-center font-bold text-xl leading-6 min-w-[250px] min-h-[80px] justify-center">
              Learn more
            </button>
          </div>
        </div>
        <Image
          priority
          src={Rocket}
          height={101}
          width={739}
          alt="Fluid sense logo"
          className="absolute top-[-40px] left-[1055px]"
        />
      </div>
    </div>
  );
}
