import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensConfig, LensProvider, staging } from "@lens-protocol/react";
import { localStorage } from "@lens-protocol/react/web";
import React from "react";

const { provider, webSocketProvider } = configureChains(
  [polygonMumbai, polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: localStorage(),
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fluid Lens</title>
        <meta name="description" content="POAP Estudiantes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <WagmiConfig client={client}>
        <LensProvider config={lensConfig}>
          <Component {...pageProps} />
        </LensProvider>
      </WagmiConfig>
    </>
  );
}
