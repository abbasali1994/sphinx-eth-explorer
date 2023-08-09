import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC } from "react";
import { WalletProvider } from "../context/WalletContext";
import App from "./app";

const Home: FC = () => {
  return (
    <WalletProvider>
      <App />
    </WalletProvider>
  );
};

export default Home;
