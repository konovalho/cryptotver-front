import { AbstractProvider } from "web3-core";
import { connectors } from "./connectors";

declare global {
  interface Window {
    ethereum?: AbstractProvider;
    tronWeb?: any;
  }
}

export const wallets = [
  {
    icon: require("./wallets-icons/Metamask.png"),
    title: "MetaMask",
    connector: connectors.injected,
    key: "injected",
  },
];
