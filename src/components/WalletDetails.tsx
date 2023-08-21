import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { WalletContext } from "../context/WalletContext";
import formatAddress from "@/utils/formatAddress";
const WalletDetails = () => {
  const { address } = useContext(WalletContext);
  return (
    <>
      <Row>
        <Col sm={6} className="heading">
          Account:
        </Col>
        <Col sm={6} className="value">
          {formatAddress(address)}
        </Col>
      </Row>
    </>
  );
};

export default WalletDetails;
