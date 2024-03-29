import React from "react";
import Image from "next/image";

interface TokenCardInterface {
  token: any;
}

export default function TokenCard({ token }: TokenCardInterface) {
  const img = token.img as any;

  return (
    <div className="flex items-center">
      <Image
        width={100}
        height={100}
        alt="Token Image"
        src={img.src}
        className="h-12 w-12"
      />
      <div className="ml-4">{token.symbol}</div>
    </div>
  );
}
