import ConnectWallet from "@/components/ConnectWallet";
import ConnectedWalletInfo from "@/components/ConnectedInfo";
import { WalletContext } from "@/context/WalletContext";
import React, { useContext } from "react";

const App = () => {
  const { address } = useContext(WalletContext);
  return <div className="app">{!address ? <ConnectWallet /> : <ConnectedWalletInfo />}</div>;
};

export default App;
