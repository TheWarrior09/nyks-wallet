import { EncodeObject, GeneratedType, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes, isDeliverTxSuccess, SigningStargateClient } from '@cosmjs/stargate';
import { useState } from 'react';
import { MsgRegisterBtcDepositAddress } from 'src/proto/types/tx';
import { chainId, coinDenom, twilightRpcUrl } from './constants';

//
const msgRegisterBtcDepositAddressTypeUrl =
  '/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress';

interface MsgRegisterBtcDepositAddressEncodeObject extends EncodeObject {
  readonly typeUrl: typeof msgRegisterBtcDepositAddressTypeUrl;
  readonly value: MsgRegisterBtcDepositAddress;
}

const txTypes: ReadonlyArray<[string, GeneratedType]> = [
  [msgRegisterBtcDepositAddressTypeUrl, MsgRegisterBtcDepositAddress],
];

const myDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ...defaultRegistryTypes,
  ...txTypes, // As you defined bankTypes earlier
];

function createDefaultRegistry(): Registry {
  return new Registry(myDefaultRegistryTypes);
}

interface IuseKeplrWallet {
  btcAddress: string | undefined;
  twilightAddress: string | undefined;
}

export const useTwilightRpcWithCosmjs = ({ btcAddress, twilightAddress }: IuseKeplrWallet) => {
  const [txIdNYKS, setTxIdNYKS] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [isDepositAddressRegistered, setIsDepositAddressRegistered] = useState(false);

  const registerBtcAddressOnNyks = async () => {
    if (window.keplr && btcAddress && twilightAddress) {
      const offlineSigner: OfflineSigner = window.keplr.getOfflineSigner!(chainId);
      const signingClient = await SigningStargateClient.connectWithSigner(
        twilightRpcUrl,
        offlineSigner,
        {
          registry: createDefaultRegistry(),
        },
      );

      const btcDepositAddressMsg: MsgRegisterBtcDepositAddressEncodeObject = {
        typeUrl: msgRegisterBtcDepositAddressTypeUrl,
        value: {
          depositAddress: btcAddress!,
          twilightDepositAddress: twilightAddress,
        },
      };

      const fee = {
        amount: [
          {
            denom: coinDenom,
            amount: '500',
          },
        ],
        gas: '100000',
      };

      // const fee = "auto";

      setLoading(true);

      const broadcastTxResponse = await signingClient.signAndBroadcast(
        twilightAddress,
        [btcDepositAddressMsg],
        fee,
      );

      setLoading(false);

      setTxIdNYKS(broadcastTxResponse.transactionHash);

      const transactionSuccessStatus = isDeliverTxSuccess(broadcastTxResponse);
      if (transactionSuccessStatus) {
        setIsDepositAddressRegistered(true);
      }
    }
  };

  return {
    registerBtcAddressOnNyks,
    txIdNYKS,
    registerBtcAddressOnNyksLoadingState: loading,
    isDepositAddressRegistered,
  };
};
