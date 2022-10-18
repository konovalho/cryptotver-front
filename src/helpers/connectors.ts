import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";
import { networks } from "./networks";

const supportedChainIds = Object.keys(networks).map((networkKey) => {
  return Web3.utils.hexToNumber(networkKey);
});

const injected = new InjectedConnector({
  supportedChainIds,
});

export const connectors = {
  injected: injected,
};
