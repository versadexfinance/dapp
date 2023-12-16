// import { chain, configureChains, createConfig } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';



// const {chains, publicClient, webSocketPublicClient } = configureChains([chains], [publicProvider()]);

// export const client = createConfig({
//     autoConnect: true,
//     provider,
//     webSocketProvider,
// });



// import { createConfig, configureChains } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public'
// import { goerli } from 'wagmi/chains'

// const {  publicClient, webSocketPublicClient } = configureChains(
//   [goerli],
//   [publicProvider()],
// )
 
// export const client = createConfig({
//   publicClient,
//   webSocketPublicClient,
// })

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [goerli],
    [publicProvider()]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID_sadasdsa',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
  });

export default {wagmiConfig, chains} as const;

