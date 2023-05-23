import daiLogo from "../../public/dai.png";
import usdcLogo from "../../public/usdc.svg";
import wmaticLogo from "../../public/wmatic.png";

export const tokens = [
  {
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    addressX: "0xCAa7349CEA390F89641fe306D93591f87595dc1F",
    img: usdcLogo,
    symbol: "USDC",
    factory: "0xf3Be3653C8b903c12215076F8e69463627a11501",
  },
  {
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    addressX: "0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2",
    img: daiLogo,
    symbol: "DAI",
    factory: "0x7C2A78A46c18EaE1d98f5408798D8393D7675F1f",
  },
  {
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    addressX: "0xe04ad5d86c40d53a12357E1Ba2A9484F60DB0da5",
    img: wmaticLogo,
    symbol: "WMATIC",
    factory: "0xf74b95dcdD028EE94f91EA9FAee240A2AB66D0Cf",
  },
];
