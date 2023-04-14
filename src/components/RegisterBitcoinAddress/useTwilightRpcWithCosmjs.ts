import { EncodeObject, GeneratedType, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import {
  defaultRegistryTypes,
  isDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  calculateFee,
  DeliverTxResponse,
} from '@cosmjs/stargate';
import { useState } from 'react';
import {
  twilightprojectProtoRegistry,
  getSigningTwilightprojectClient,
  twilightproject,
} from 'src/codegen';
import { chainId, coinDenom, twilightRpcUrl } from './constants';
import { MsgWithdrawBtcRequest } from 'src/codegen/nyks/bridge/tx';
import { useMutation } from '@tanstack/react-query';

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
async function getSigningClient() {
  if (!window.keplr) return;
  try {
    const offlineSigner: OfflineSigner = window.keplr.getOfflineSigner!(chainId);
    const signingClient = await getSigningTwilightprojectClient({
      rpcEndpoint: twilightRpcUrl,
      signer: offlineSigner,
    });
    return signingClient;
  } catch (error) {
    throw error;
  }
}
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

  const signAndBroadcastWithdrawBtcTx = async (msg: MsgWithdrawBtcRequest) => {
    const signingClient = await getSigningClient();
    if (signingClient === undefined) return;
    const { withdrawBtcRequest } = twilightproject.nyks.bridge.MessageComposer.withTypeUrl;
    const msgWithdrawBtcRequest = withdrawBtcRequest({
      withdrawAddress: msg.withdrawAddress,
      reserveAddress: msg.reserveAddress,
      withdrawAmount: msg.withdrawAmount,
      twilightAddress: msg.twilightAddress,
    });
    const gasPrice = GasPrice.fromString('1nyks');
    const gasEstimation = await signingClient.simulate(
      msg.twilightAddress,
      [msgWithdrawBtcRequest],
      '',
    );
    const fee = calculateFee(Math.round(gasEstimation * 1.3), gasPrice);
    return signingClient.signAndBroadcast(msg.twilightAddress, [msgWithdrawBtcRequest], fee);
  };

  const {
    data: msgBtcWithdrawResponseData,
    error: msgBtcWithdrawResponseError,
    status: msgBtcWithdrawResponseStatus,
    mutate: withdrawBtcFromNyks,
  } = useMutation({
    mutationFn: signAndBroadcastWithdrawBtcTx,
  });

  const getTransactionStatus = (txResponse: DeliverTxResponse) =>
    isDeliverTxSuccess(txResponse) ? 'Success' : 'Failed';

  return {
    registerBtcAddressOnNyks,
    txIdNYKS,
    registerBtcAddressOnNyksLoadingState: loading,
    isDepositAddressRegistered,
    withdrawBtcFromNyks,
    msgBtcWithdrawResponseData,
    msgBtcWithdrawResponseError,
    msgBtcWithdrawResponseStatus,
    getTransactionStatus,
  };
};
