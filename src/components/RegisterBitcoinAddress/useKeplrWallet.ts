import { AccountData, Coin, OfflineSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { ChainInfo } from '@keplr-wallet/types';
import { useEffect, useState } from 'react';
import { chainId, twilightRestUrl, twilightRpcUrl } from './constants';

export const useKeplrWallet = () => {
  const [accountInfo, setAccountInfo] = useState<AccountData>();
  const [accountBalanceInfo, setAccountBalanceInfo] = useState<readonly Coin[]>();
  const [keplrConnected, setKeplrConnected] = useState(false);

  useEffect(() => {
    const getAcooutInfoAndBalance = async () => {
      if (window.keplr) {
        setKeplrConnected(true);
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
    const interval = setInterval(getAcooutInfoAndBalance, 3000);
    return () => {
      setKeplrConnected(false);
      clearInterval(interval);
    };
  }, []);

  const connectKeplr = async () => {
    if (!window.keplr) {
      alert('Please install keplr extension');
    } else {
      await window.keplr!.experimentalSuggestChain(getTestnetChainInfo());
      await window.keplr.enable(chainId);

      setKeplrConnected(true);
    }
  };

  return {
    connectKeplr,
    accountInfo,
    accountBalanceInfo,
    keplrConnected,
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
      coinGeckoId: 'nyks',
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
      coinGeckoId: 'nyks',
      //   gasPriceStep: { low: 50000, average: 100000, high: 200000 },
      gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 },
    },
  ],
  stakeCurrency: {
    coinDenom: 'nyks',
    coinMinimalDenom: 'nyks',
    coinDecimals: 1,
    coinGeckoId: 'nyks',
  },
  features: ['no-legacy-stdTx'],
});
