import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { LensConfig, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensProvider } from "@lens-protocol/react-web";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";

const { chains, provider, webSocketProvider } = configureChains(
  [polygon],
  [publicProvider()]
);

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

const { connectors } = getDefaultWallets({
  appName: "Fluid Sense",
  chains,
});

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FluidSense</title>
        <meta name="description" content="Fluid Sense Official Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <WagmiConfig client={client}>
        <LensProvider config={lensConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>{" "}
        </LensProvider>
      </WagmiConfig>
    </>
  );
}
