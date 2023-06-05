import React from "react";

export default function SectionChoose() {
  return (
    <div className="bg-[url('../../public/bg3.jpg')] bg-no-repeat bg-center bg-cover min-h-[800px] px-32">
      <div className="max-w-[701px]">
        <h1 className="text-superfluid-100 text-7xl font-semiboldmt pt-[205px] mb-[80px]">
          Why choose Fluidify to grow your audience?
        </h1>
        <div className="text-white text-lg mb-[80px]">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris.
        </div>
      </div>
      <button className="font-semibold text-black px-10 py-4 rounded-full h-12 bg-superfluid-100 flex items-center leading-6 min-w-[250px] min-h-[80px] justify-center text-xl">
        Launch app
      </button>
    </div>
  );
}
