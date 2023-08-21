import { useContext } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { WalletContext } from "../context/WalletContext";
import TransactionHistoryTable from "./TranxTable";
const ConnectedWalletInfo = () => {
  const { address, disconnectWallet } = useContext(WalletContext);

  return (
    <>
      <Card
        style={{
          width: "600px",
          fontWeight: "bold",
          margin: "auto",
          top: "20px",
        }}>
        <CardBody>
          <Row>
            <Col sm={3} className="heading">
              Account:
            </Col>
            <Col sm={9} className="value">
              {address}
            </Col>
          </Row>
          <Button color="primary" block onClick={() => disconnectWallet()}>
            Disconnect Wallet
          </Button>
        </CardBody>
      </Card>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <TransactionHistoryTable />
      </div>
    </>
  );
};

export default ConnectedWalletInfo;
