import React, { useState } from "react";
import TokensModal from "../Modals/TokensModal";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface TokenSelectorInterface {
  getTokenSelected: (token: string) => void;
  token: any;
}

export default function TokenSelector({
  token,
  getTokenSelected,
}: TokenSelectorInterface) {
  const [openModal, setOpenModal] = useState(false);
  let img;

  const getOpenModal = (modalClose: boolean) => {
    setOpenModal(modalClose);
  };

  if (token) {
    img = token.img as any;
  }

  return (
    <div className="flex rounded-2xl px-3 py-2 w-40 border-superfluid-100 border-2 bg-superfluid-200 mt-4">
      {openModal && (
        <TokensModal
          getOpenModal={getOpenModal}
          getTokenSelected={getTokenSelected}
        />
      )}
      <button onClick={() => setOpenModal(true)}>
        {token ? (
          <div className="flex items-center w-32 justify-between ">
            <Image
              width={100}
              height={100}
              alt="Token Image"
              src={img.src}
              className="h-6 w-6 rounded-full"
            />
            <div className="ml-1 font-bold">{token.symbol}</div>{" "}
            <ChevronDownIcon className="h-6 w-6 ml-6" aria-hidden="true" />
          </div>
        ) : (
          <div className="flex items-center w-32 justify-between">
            <div>Select Token</div>
            <ChevronDownIcon className="h-6 w-6 ml-6" aria-hidden="true" />
          </div>
        )}
      </button>
    </div>
  );
}
