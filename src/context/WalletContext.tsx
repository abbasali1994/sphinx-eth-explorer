import { DAI_TOKEN } from "@/utils/consts";
import { createTransactionObjectByEvent } from "@/utils/txns";
import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { fetchTransactionList } from "../utils/api";
import { getBalance, getSignerAddress, getUSDCBalance, isValidAddress } from "../utils/ethersUtils";
const web3 = new Web3("wss://goerli.infura.io/ws/v3/081ef49860d24c1eb109c97454700a02");

export interface WalletContextType {
  address: string | null;
  bal: string;
  tokenBal: number | null;
  transactionList: any[];
  setTransactionList: any;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  fetchBalances: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextType>({
  address: null,
  bal: null,
  tokenBal: null,
  transactionList: [],
  setTransactionList: [],
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  fetchBalances: async () => {},
});

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState<any>();
  const [tokenBal, setTokenBal] = useState<any>();
  const [bal, setBal] = useState<any>();
  const [transactionList, setTransactionList] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const addr = await getSignerAddress();
          const tokenBalance = await getUSDCBalance();
          const balance = await getBalance();
          setBal(balance);
          setTokenBal(tokenBalance);
          setAddress(addr);

          if (isValidAddress(addr)) {
            const transactions = await fetchTransactionList(addr, 1, 10);
            setTransactionList(transactions);
          }

          web3.eth.clearSubscriptions(false);
          let subscription = await web3.eth.subscribe("logs", {
            address: DAI_TOKEN.address,
            topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
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
        }
      } catch (err) {
        console.log(err);
      }

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", connectWallet);
      }
    };
    init();
  }, []);

  const fetchBalances = async () => {
    if (isValidAddress(address)) {
      const tokenBalance = await getUSDCBalance();
      const balance = await getBalance();
      setBal(balance);
      setTokenBal(tokenBalance);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const addr = await getSignerAddress();
        const tokenBalance = await getUSDCBalance();
        const balance = await getBalance();
        setBal(balance);
        setTokenBal(tokenBalance);
        setAddress(addr);

        if (isValidAddress(addr)) {
          const transactions = await fetchTransactionList(addr, 1, 10);
          setTransactionList(transactions);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAddress(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        bal,
        tokenBal,
        transactionList,
        setTransactionList,
        connectWallet,
        disconnectWallet,
        fetchBalances,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
