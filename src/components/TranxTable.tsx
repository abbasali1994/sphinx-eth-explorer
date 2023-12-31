import { useContext, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import { SyncLoader } from "react-spinners";
import { Button, Input } from "reactstrap";
import { WalletContext } from "../context/WalletContext";
import formatAddress from "../utils/formatAddress";
import { AddressTooltip } from "./Tooltip";
const columns = [
  {
    dataField: "timestamp",
    text: "Date",
    formatter: (cell, row) => (
      <>
        <div>{cell}</div>
        <div style={{ fontSize: "small" }}>{row.time}</div>
      </>
    ),
  },
  {
    dataField: "transactionHash",
    text: "Transaction Hash",
    formatter: (cell, row) => (
      <a href={`https://etherscan.io/tx/${cell}`} target="_blank" rel="noopener noreferrer">
        {formatAddress(cell)}
      </a>
    ),
  },
  {
    dataField: "from",
    text: "From",
    formatter: (cell: string) => (
      <>
        <AddressTooltip targetId={`fromTooltip_${cell}`} content={cell} />
        <span id={`fromTooltip_${cell}`}>{formatAddress(cell)}</span>
      </>
    ),
  },
  {
    dataField: "to",
    text: "To",
    formatter: (cell: string) => (
      <div>
        <AddressTooltip targetId={`toTooltip_${cell}`} content={cell} />
        <span id={`toTooltip_${cell}`}>{formatAddress(cell)}</span>
      </div>
    ),
  },
  {
    dataField: "blockNumber",
    text: "Block Number",
  },
  {
    dataField: "value",
    text: "Value",
    sort: true,
  },
];

function TransactionHistoryTable() {
  const { transactionList, isLoading } = useContext(WalletContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const onPageChange = async (page) => {
    setCurrentPage(page);
  };

  return isLoading && !transactionList.slice((currentPage - 1) * sizePerPage, currentPage * sizePerPage).length ? (
    <span style={{ display: "flex", marginTop: "30px" }}>
      Loading Transactions <SyncLoader size={10} style={{ marginLeft: "10px" }} />
    </span>
  ) : (
    <div className="container">
      <div style={{ marginTop: 20 }}>
        <BootstrapTable
          striped
          hover
          keyField="transactionHash"
          data={transactionList.slice((currentPage - 1) * sizePerPage, currentPage * sizePerPage)}
          columns={columns}
          filter={filterFactory()}
        />
        <div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <Input
              style={{ width: "80px" }}
              type="select"
              className="form-control"
              value={sizePerPage}
              onChange={(e: any) => {
                setSizePerPage(e.target.value);
                onPageChange(currentPage);
              }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </Input>
            <div className="ml-auto">
              <Button
                color="primary"
                size="sm"
                className="mx-1"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                Prev
              </Button>
              Page: {currentPage}
              <Button
                color="primary"
                size="sm"
                className="mx-1"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={transactionList.length <= currentPage * sizePerPage}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistoryTable;
