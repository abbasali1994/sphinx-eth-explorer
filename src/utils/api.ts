import { DAI_TOKEN } from "./consts";
import { createTransactionObject } from "./txns";
export const fetchTransactionList = async (
  address: string,
  page: number,
  offset: number
) => {
  const data = await fetch(
    `https://api-mainnet.etherscan.io/api?module=account&action=tokentx&contractAddress=${DAI_TOKEN.address}&address=${address}&startblock=0&endblock=latest&page=${page}&offset=${offset}&sort=desc&apikey=2G3ZRWKIQQWNVIT4D6QMN55E9ZQHSUKGPN`
  );
  const response = await data.json();
  const transactionData = response.result.map((item: any) => createTransactionObject(item));
  return transactionData;
};
