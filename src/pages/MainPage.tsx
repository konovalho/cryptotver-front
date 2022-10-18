import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import { wallets } from "src/helpers/_wallets";
import { NetworkKey, networks } from "src/helpers/networks";
import { getBalance, setBalance } from "src/api/storage";

import logo from "../logo.svg";
import "../App.css";
import styles from "./main.module.css";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowSuccessToast, setIsShowSuccessToast] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [internalBalance, setInternalBalance] = useState<number>(0);
  const [newBalance, setNewBalance] = useState<string>("");
  const { activate, account, library, chainId } = useWeb3React<Web3>();

  const network =
    library && chainId
      ? networks[library.utils.toHex(chainId) as NetworkKey]
      : undefined;

  console.log("storageContractAddress", network?.storageContractAddress);

  const wallet = wallets[0];

  const firstRenderActivate = async () => {
    await activate(
      wallet.connector,
      (error) => {
        console.log(error);
      },
      true
    );
  };

  useEffect(() => {
    if (!account) {
      firstRenderActivate();
    }
  }, []);

  const fetchBalance = async () => {
    const contractBalance = await getBalance({
      library,
      storageContractAddress: network?.storageContractAddress,
      account: account!,
    });
    setInternalBalance(contractBalance);
  };

  useEffect(() => {
    if (network && account) {
      fetchBalance();
    }
  }, [network, account]);

  useEffect(() => {
    let toastTimer: NodeJS.Timeout;
    if (isShowSuccessToast) {
      toastTimer = setTimeout(() => {
        setIsShowSuccessToast(false);
      }, 5000);
    }

    return () => {
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
    };
  }, [isShowSuccessToast]);

  useEffect(() => {
    let toastTimer: NodeJS.Timeout;
    if (isShowError) {
      toastTimer = setTimeout(() => {
        setIsShowError(false);
      }, 5000);
    }

    return () => {
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
    };
  }, [isShowError]);

  console.log("account", account);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!newBalance) {
      setIsShowError(true);
      return;
    }
    setIsLoading(true);
    const updatedBalance = await setBalance({
      library,
      storageContractAddress: network?.storageContractAddress,
      account: account!,
      amount: Number(newBalance),
    });
    setInternalBalance(updatedBalance);
    setIsLoading(false);
    setIsShowSuccessToast(true);
    setNewBalance("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            color: "#c6ef0e",
            marginTop: 0,
          }}
        >
          We support only Goerli Testnet
        </h1>
        <div>
          <p>
            Your address: <b>{account}</b>
          </p>
          <p>
            Your balance: <b>{internalBalance}</b>
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="new-balance" className={styles.label}>
              New balance:
              <input
                className={styles.input}
                disabled={isLoading}
                type="number"
                id="new-balance"
                value={newBalance}
                onChange={(evt) => {
                  setNewBalance(evt.target.value);
                }}
              />
            </label>
            <button
              disabled={isLoading}
              type="submit"
              className={styles.button}
            >
              Update balance
            </button>
          </form>
        </div>
        {isShowError ? (
          <p className={styles.error}>Balance should be not empty</p>
        ) : null}
        {isLoading ? (
          <div>
            <p
              style={{
                color: "white",
              }}
            >
              is loading ...
            </p>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        ) : null}
        {isShowSuccessToast ? (
          <p
            style={{
              color: "#3f3",
            }}
          >
            Storage successfully updated!{" "}
          </p>
        ) : null}
      </header>
    </div>
  );
}

export default App;
