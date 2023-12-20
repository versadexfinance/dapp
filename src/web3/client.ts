

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, mainnet } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [goerli],
    [publicProvider()]
  );
  

  console.log(process.env.PROJECT_NAME);
  console.log(process.env.PROJECT_ID);
  
  const { connectors } = getDefaultWallets({
    appName: process.env.PROJECT_NAME ?? "x",
    projectId:process.env.PROJECT_ID ?? "x", 
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
  });

export default {wagmiConfig, chains} as const;

