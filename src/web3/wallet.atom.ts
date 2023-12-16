// 'use client';
// import { atom, useRecoilState } from 'recoil';

// // import Web3Modal from '@/web3modal';
// // import WalletConnectProvider from '@walletconnect/web3-provider';
// // import * as moment from 'moment';
// // import axios from 'axios';
// import { ethers } from 'ethers';

// // import { ERC20_TOKEN_ABI } from '@/modules/abis';
// // import { TIN_ICO_ABI, TIN_ICO_ABI_OLD } from '@/modules/abis';
// // import { TIN_ICO, TIN_ICO_OLD } from '@/modules/contracts';

// export const walletState = atom({
//   key: 'walletState',
//   default: {
//     web3modal: null,
//     chain: {
//       id: null,
//       name: null
//     },
//     chains: [],
//     provider: null,
//     address: null,
//     checksum: null,
//     balances: {
//       ether: 0,
//       busd: 0
//     },
//     loading: false,
//     admin: false
//   }
// });

// export const useWalletStore = () => {
//   const [wallet, setWallet] = useRecoilState(walletState);

//   const connect = async () => {
//     setWallet((prevWallet) => ({ ...prevWallet, loading: true }));

//     console.log('Connecting account');
//     try {
//       const provider = await wallet.web3modal.connect();
//       setWallet((prevWallet) => ({ ...prevWallet, provider }));
//       setProviderEvents();
//       await setData();
//     } catch (error) {
//       console.error('Could not get a wallet connection', error);
//     } finally {
//       setWallet((prevWallet) => ({ ...prevWallet, loading: false }));
//     }
//   };

//   const setData = async () => {
//     if (!wallet.provider) {
//       return;
//     }

//     try {
//       const web3 = new ethers.providers.Web3Provider(wallet.provider);

//       const chainId =
//         typeof ethereum !== 'undefined'
//           ? await parseInt(ethereum.networkVersion)
//           : await web3.getNetwork();
//       setWallet((prevWallet) => ({
//         ...prevWallet,
//         chain: { ...prevWallet.chain, id: chainId }
//       }));

//       const chainName = wallet.chains.find((o) => o.chainId === chainId)?.name;
//       setWallet((prevWallet) => ({
//         ...prevWallet,
//         chain: { ...prevWallet.chain, name: chainName }
//       }));

//       const res = await ethereum.request({ method: 'eth_accounts' });
//       const address = res[0];
//       const checksum = ethers.utils.getAddress(address);
//       const admin = /0xbE8.*.a1Ce/.test(checksum);

//       setWallet((prevWallet) => ({ ...prevWallet, address, checksum, admin }));

//       web3.on('block', () => {
//         // Handle new block event
//       });
//     } catch (error) {
//       console.error('Error setting data', error);
//     }
//   };

//   const disconnect = async () => {
//     await wallet.web3modal.clearCachedProvider();
//     reset();
//   };

//   const reset = () => {
//     setWallet((prevWallet) => ({
//       ...prevWallet,
//       chain: { id: null, name: null },
//       provider: null,
//       address: null,
//       checksum: null,
//       balances: { ether: 0, busd: 0 },
//       loading: false,
//       admin: false
//     }));
//   };

//   const setProviderEvents = () => {
//     wallet.provider.on('accountsChanged', (accounts) => {
//       console.info('accountsChanged');
//       setWallet((prevWallet) => ({ ...prevWallet, loading: true }));
//       if (wallet.address && accounts && accounts.length) setData();
//       else disconnect();
//     });

//     wallet.provider.on('chainChanged', () => {
//       console.info('chainChanged');
//       setWallet((prevWallet) => ({ ...prevWallet, loading: true }));
//       setData();
//     });

//     wallet.provider.on('disconnect', () => {
//       console.info('disconnect');
//       setWallet((prevWallet) => ({ ...prevWallet, loading: true }));
//       disconnect();
//     });
//   };

//   // Add other functions as needed

//   return {
//     wallet,
//     connect,
//     setData,
//     disconnect
//   };
// };
