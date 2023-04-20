import { useState } from 'react';
import { IBlockstreamUTXO, IBtcFee } from './btcWalletTypes';

const blocksreamURL = 'https://blockstream.info/';
const blockchainInfoURL = 'https://api.blockchain.info/';

export const useThirdPartyApi = () => {
  const [addressUTXOs, setAddressUTXOs] = useState<IBlockstreamUTXO[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [btcCurrentFee, setBtcCurrentFee] = useState<IBtcFee>();
  const [txID, setTxID] = useState<string>();

  const getAddressUTXOs = async (btcAddress: string | undefined) => {
    if (btcAddress) {
      const frontendAddress = btcAddress!;
      const blockstreamURLUTXO = `${blocksreamURL}api/address/${frontendAddress}/utxo`;
      const response = await fetch(blockstreamURLUTXO);
      const data = await response.json();
      const utxos = data;
      setAddressUTXOs(utxos);
      setTotalBalance(
        utxos.reduce((prev: any, acc: any) => {
          return (prev += acc.value);
        }, 0),
      );
    }
  };

  const getFeeEstimates = async () => {
    const extimatedFee = `${blockchainInfoURL}mempool/fees`;
    const response = await fetch(extimatedFee);
    const btcFeeData = await response.json();
    setBtcCurrentFee(btcFeeData);
  };

  const broadcastTranasction = async (rawTranasctionHex: string | undefined) => {
    if (!rawTranasctionHex) return;
    const rawResponse = await fetch(`${blocksreamURL}api/tx`, {
      method: 'POST',
      body: rawTranasctionHex,
    });
    const txid = await rawResponse.text();

    setTxID(txid);
  };

  return {
    getFeeEstimates,
    btcCurrentFee,
    broadcastTranasction,
    txID,
    addressUTXOs,
    totalBalance,
    getAddressUTXOs,
  };
};
