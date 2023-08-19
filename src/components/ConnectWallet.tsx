import React, { useContext } from "react";
import { Button, Card, CardBody, Input } from "reactstrap";
import { WalletContext, WalletContextType } from "../context/WalletContext";

const ConnectWallet = () => {
  const { connectWallet } = useContext<WalletContextType>(WalletContext);
  const [address, setAddress] = React.useState<string>("");

  return (
    <Card style={{ width: "400px", margin: "auto" }}>
      <CardBody>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your wallet address"
        />
        <Button onClick={() => connectWallet(address)} size="md" color="primary" block>
          Connect Wallet
        </Button>
      </CardBody>
    </Card>
  );
};

export default ConnectWallet;
