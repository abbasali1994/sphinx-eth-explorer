import { DAI_TOKEN, web3Http, web3WSS } from "@/utils/consts";
import { createTransactionObjectByEvent } from "@/utils/txns";
import { createContext, useEffect, useState } from "react";
import { fetchTransactionList } from "../utils/api";
import { isValidAddress } from "../utils/ethersUtils";

export interface WalletContextType {
  address: string | null;
  transactionList: any[];
  isLoading: boolean;
  setTransactionList: any;
  connectWallet: (address: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextType>({
  address: null,
  transactionList: [],
  isLoading: true,
  setTransactionList: [],
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});

export const WalletProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<any>();
  const [transactionList, setTransactionList] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        web3WSS.eth.clearSubscriptions(false);
        let subscription = await web3WSS.eth.subscribe("logs", {
          address: DAI_TOKEN.address,
          topics: [web3WSS.utils.sha3("Transfer(address,address,uint256)")],
        });
        subscription.on("data", async (event: any) => {
          if (event.topics.length == 3) {
            const transaction = createTransactionObjectByEvent(event);

            setTransactionList((transactions) => {
              if (!transactions.find((txn) => txn.transactionHash == transaction.transactionHash)) {
                if (transaction.from == address || transaction.to == address) return [transaction, ...transactions];
              }

              return transactions;
            });
          }
        });
        subscription.on("error", (err) => {
          throw err;
        });
        subscription.on("connected", (nr) => console.log("Subscription on ERC-20 started with ID %s", nr));
      } catch (err) {
        console.log(err);
      }
    };
    if (address) init();
  }, [address]);

  const addTransactions = (transactions: any[]) => {
    console.log("transactions",transactions)
    setTransactionList((prevTransactions) => [...prevTransactions, ...transactions]);
  };

  const connectWallet = async (address) => {
    try {
      if (isValidAddress(address)) {
        setAddress(address.toLowerCase());
        fetchTransactionList(address.toLowerCase(), addTransactions).then(res => setIsLoading(res));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        transactionList,
        isLoading,
        setTransactionList,
        connectWallet,
        disconnectWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
