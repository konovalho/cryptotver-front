import Web3 from "web3";
import storageContractAbi from "src/helpers/contracts/Storage.json";

export const getBalance = async ({
  library,
  storageContractAddress,
}: {
  library?: Web3;
  storageContractAddress?: string | null;
  account: string;
}) => {
  if (!storageContractAddress) {
    throw new Error("Get balance doesn't have contract address");
  }
  const StorageContract = new (library as Web3).eth.Contract(
    storageContractAbi.abi as any,
    storageContractAddress
  );

  const storageState: number = await StorageContract.methods.get().call();
  return storageState;
};

export const setBalance = async ({
  library,
  storageContractAddress,
  account,
  amount,
}: {
  library?: Web3;
  storageContractAddress?: string | null;
  account: string;
  amount: number;
}) => {
  if (!storageContractAddress) {
    throw new Error("Send balance doesn't have contract address");
  }
  const StorageContract = new (library as Web3).eth.Contract(
    storageContractAbi.abi as any,
    storageContractAddress
  );

  try {
    const result = await StorageContract.methods.set(amount).send({
      from: account,
    });
    console.log("result", result);

    return await StorageContract.methods.get().call();
  } catch (error) {
    console.error(error);
  }
};
