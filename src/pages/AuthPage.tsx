import React from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import { wallets } from "src/helpers/_wallets";

import styles from "./auth.module.css";

function App() {
  const { activate, library } = useWeb3React<Web3>();

  console.log("wallets", wallets);
  const wallet = wallets[0];

  // { connector, key }
  const onConnect = async () => {
    console.log("onConnect");
    try {
      await activate(
        wallet.connector,
        (error) => {
          console.log(error);
        },
        true
      );
    } catch (error) {}
  };

  return (
    <div className="App">
      <section className={styles.wrapper}>
        <div
          className={styles.item}
          onClick={() => {
            console.log("click");
            onConnect();
          }}
        >
          <img src={wallet.icon} alt={wallet.title} />
          <h3>{wallet.title}</h3>
        </div>
        {/* {wallets.map((wallet, id) => (
              <WalletConnectItem
                key={id}
                icon={wallet.icon}
                title={wallet.title}
                onClick={() => {
                  if (wallet.connector) {
                    onConnect &&
                      onConnect({
                        connector: wallet.connector,
                        key: wallet.key,
                      });
                  }
                }}
              />
            ))} */}
      </section>
    </div>
  );
}

export default App;
