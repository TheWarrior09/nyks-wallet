import { AccountData, Coin, OfflineSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { ChainInfo, StdSignature } from '@keplr-wallet/types';
import { useState } from 'react';
import { chainId, msgForSignature, twilightRestUrl, twilightRpcUrl } from './constants';

export const useKeplrWallet = () => {
  const [keplrSignature, setKeplrSignature] = useState<StdSignature>();
  const [accountInfo, setAccountInfo] = useState<AccountData>();
  const [accountBalanceInfo, setAccountBalanceInfo] = useState<readonly Coin[]>();

  const connectKeplr = async () => {
    if (!window.keplr) {
      alert('Please install keplr extension');
    } else {
      await window.keplr!.experimentalSuggestChain(getTestnetChainInfo());
      await window.keplr.enable(chainId);

      const offlineSigner: OfflineSigner = window.keplr.getOfflineSigner!(chainId);
      const account: AccountData = (await offlineSigner.getAccounts())[0];
      setAccountInfo(account);

      const signingClient = await SigningStargateClient.connectWithSigner(
        twilightRpcUrl,
        offlineSigner,
      );
      const balances: readonly Coin[] = (await signingClient.getAllBalances(account.address))!;
      setAccountBalanceInfo(balances);
    }
  };

  const signMessage = async () => {
    if (window.keplr && accountInfo) {
      const keplrMsgSignature = await window.keplr.signArbitrary(
        chainId,
        accountInfo.address,
        msgForSignature,
      );
      setKeplrSignature(keplrMsgSignature);
    }
  };

  return {
    connectKeplr,
    signMessage,
    keplrSignature,
    accountInfo,
    accountBalanceInfo,
  };
};

const getTestnetChainInfo = (): ChainInfo => ({
  chainId: chainId,
  chainName: 'nyks',
  rpc: twilightRpcUrl,
  rest: twilightRestUrl,
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'twilight',
    bech32PrefixAccPub: 'twilight' + 'pub',
    bech32PrefixValAddr: 'twilight' + 'valoper',
    bech32PrefixValPub: 'twilight' + 'valoperpub',
    bech32PrefixConsAddr: 'twilight' + 'valcons',
    bech32PrefixConsPub: 'twilight' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'nyks',
      coinMinimalDenom: 'nyks',
      coinDecimals: 1,
      coinGeckoId: 'cosmos',
    },
    {
      coinDenom: 'btc',
      coinMinimalDenom: 'btc',
      coinDecimals: 8,
      coinGeckoId: 'bitcoin',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'nyks',
      coinMinimalDenom: 'nyks',
      coinDecimals: 1,
      coinGeckoId: 'cosmos',
      //   gasPriceStep: { low: 50000, average: 100000, high: 200000 },
      gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 },
    },
  ],
  stakeCurrency: {
    coinDenom: 'nyks',
    coinMinimalDenom: 'nyks',
    coinDecimals: 1,
    coinGeckoId: 'cosmos',
  },
  features: ['no-legacy-stdTx'],
});
