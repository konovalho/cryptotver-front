import { GoerliTestnet } from "./networks/GoerliTestnet";

const Testnets = {
  // Ethereum
  "0x5": GoerliTestnet,
};

export const networks = Testnets;

export type NetworkKey = keyof typeof networks;
