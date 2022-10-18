import { NetworkInfo } from "./NetworkInfo";

const EthIcon = require("../network-icons/Eth.png");

export const GoerliTestnet: NetworkInfo = {
  icon: EthIcon,
  storageContractAddress: "0x6B371d9F2483bDE2f11E7DaCB1a2d2681aa37f05",
  params: {
    chainId: "0x5",
    chainName: "Goerli Testnet",
    rpcUrls: ["https://goerli.infura.io/v3/"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  tokens: [
    {
      chainId: 1,
      address: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
      name: "Tether",
      symbol: "USDT",
      decimals: 6,
      logoURI:
        "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
    {
      address: "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae",
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
      logoURI:
        "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png",
    },
  ],
};
