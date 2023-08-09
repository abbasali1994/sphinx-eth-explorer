import { web3 } from "./consts";

export const createTransactionObject = (transaction: any) => {
  return {
    transactionHash: transaction.hash,
    value: parseFloat(transaction.value) / 1e18,
    from: transaction.from,
    to: transaction.to,
    blockNumber: transaction.blockNumber,
    timestamp: new Date(parseInt(transaction.timeStamp * 1000)).toLocaleDateString(),
    time: new Date(parseInt(transaction.timeStamp * 1000)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })
  }
}

export const createTransactionObjectByEvent = (event: any) => {
  let transaction = web3.eth.abi.decodeLog(
    [
      {
        type: "uint256",
        name: "value",
        indexed: false,
      },
      {
        type: "address",
        name: "from",
        indexed: true,
      },
      {
        type: "address",
        name: "to",
        indexed: true,
      },
    ],
    event.data,
    [event.topics[0], event.topics[1], event.topics[2]]
  );
  return {
    transactionHash: event.transactionHash,
    value: parseFloat(transaction.value) / 1e18,
    from: transaction.from,
    to: transaction.to,
    blockNumber: event.blockNumber.toString(),
    timestamp: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}