export interface TokenInfo {
  chainId?: number;
  address: string | undefined;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  tags?: string[];
}

export interface NetworkInfo {
  icon: string;
  storageContractAddress?: string;
  params: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
  tokens: TokenInfo[];
}
