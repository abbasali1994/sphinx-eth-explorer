import { FMT_NUMBER } from "web3";
import { DAI_TOKEN, ERC20_ABI, web3Http } from "./consts";
import { createTransactionObjectByEvent } from "./txns";

export const fetchTransactionList = async (
  address: string,
  addTransactions
) => {

  const currentBlock = await web3Http.eth.getBlockNumber({
    number: FMT_NUMBER.STR,
    bytes: FMT_NUMBER.HEX
  });
  const DaiContract = new web3Http.eth.Contract(ERC20_ABI, DAI_TOKEN.address);

  let fromBlock = Math.max(parseInt(currentBlock) - 50000, 0)
  let toBlock = currentBlock
  while (fromBlock > 0) {
    const toEvents = await DaiContract.getPastEvents('Transfer', {
      filter: { to: address },
      fromBlock,
      toBlock
    })
    const fromEvents = await DaiContract.getPastEvents('Transfer', {
      filter: { from: address },
      fromBlock,
      toBlock
    })
    let events = []
    events.push(...toEvents, ...fromEvents)
    toBlock = Math.max(parseInt(fromBlock) - 1, 0)
    fromBlock = Math.max(parseInt(toBlock) - 50000, 0)
    addTransactions(events.map((item: any) => createTransactionObjectByEvent(item)))
  }

  return false;
};
