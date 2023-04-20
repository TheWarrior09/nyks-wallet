import { AccountData } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { ChainInfo } from '@keplr-wallet/types';
import { useEffect, useState } from 'react';
import { chainId, twilightRestUrl, twilightRpcUrl } from './constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const getKeplr = () => {
  if (typeof window.keplr !== 'undefined') return window.keplr;
  throw new Error('window.keplr is not defined');
};

const getOfflineSigner = () => {
  try {
    const keplr = getKeplr();
    return keplr.getOfflineSigner(chainId);
  } catch (error) {
    throw error;
  }
};

const getAccounts = () => {
  try {
    const offlineSigner = getOfflineSigner();
    return offlineSigner.getAccounts();
  } catch (error) {
    throw error;
  }
};

const getAllBalances = async () => {
  try {
    const offlineSigner = getOfflineSigner();
    const account: AccountData = (await offlineSigner.getAccounts())[0];
    const signingClient = await SigningStargateClient.connectWithSigner(
      twilightRpcUrl,
      offlineSigner,
    );
    return signingClient.getAllBalances(account.address);
  } catch (error) {
    throw error;
  }
};

export const useKeplrWallet = () => {
  const [keplrConnected, setKeplrConnected] = useState(false);
  const queryClient = useQueryClient();

  const getAccountsQuery = useQuery({
    queryKey: ['getAccounts'],
    queryFn: getAccounts,
    enabled: keplrConnected,
    refetchInterval: 3000,
  });

  const getAllBalancesQuery = useQuery({
    queryKey: ['accountBalanceInfo'],
    queryFn: getAllBalances,
    enabled: keplrConnected,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (window.keplr && getAccountsQuery.data) {
      setKeplrConnected(true);
    }
  }, [getAccountsQuery.data]);

  const connectKeplr = async () => {
    if (!window.keplr) {
      alert('Please install keplr extension');
    } else {
      try {
        await window.keplr!.experimentalSuggestChain(getTestnetChainInfo());
        await window.keplr.enable(chainId);
      } catch (error) {
        alert('Please use the recent version of keplr extension');
      }
      setKeplrConnected(true);
    }
  };

  const disconnectKeplr = async () => {
    if (window.keplr) {
      try {
        await window.keplr.disable(chainId);
        queryClient.clear();
        setKeplrConnected(false);
      } catch (error) {
        throw error;
      }
    }
  };

  const getBtcBalanceOnNYKS = () => {
    const btcBalanceString = getAllBalancesQuery.data?.find(
      (balance) => balance.denom === 'btc',
    )?.amount;
    return typeof btcBalanceString === 'undefined' ? 0 : Number(btcBalanceString);
  };

  const getNyksBalanceOnNYKS = () => {
    const nyksBalanceString = getAllBalancesQuery.data?.find(
      (balance) => balance.denom === 'nyks',
    )?.amount;
    return typeof nyksBalanceString === 'undefined' ? 0 : Number(nyksBalanceString);
  };

  return {
    connectKeplr,
    keplrConnected,
    disconnectKeplr,
    getAccountsQuery,
    getAllBalancesQuery,
    getBtcBalanceOnNYKS,
    getNyksBalanceOnNYKS,
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
