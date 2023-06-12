import React from "react";

export default function SectionChoose() {
  return (
    <div className="bg-[url('../../public/bg3.jpg')] bg-no-repeat bg-center bg-cover lg:min-h-[800px] lg:px-32 px-10 pb-10">
      <div className="max-w-[701px]">
        <h1 className="text-superfluid-100 text-3xl lg:text-7xl font-semiboldmt lg:pt-[205px] lg:mb-[80px] pt-10 mb-10">
          Grow your social media presence with Fluidsense
        </h1>
        <div className="text-white text-lg mb-[80px]">
          The platform that empowers people and businesses through social media.
          Let your potential audience discover your brand and create a positive
          impact by rewarding them.
        </div>
      </div>
      <button className="font-semibold text-black px-10 py-4 rounded-full h-12 bg-superfluid-100 flex items-center leading-6 min-w-[250px] min-h-[80px] justify-center text-xl">
        Launch app
      </button>
    </div>
  );
}
