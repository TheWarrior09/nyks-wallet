import { OfflineSigner } from '@cosmjs/proto-signing';
import { isDeliverTxSuccess, GasPrice, calculateFee, DeliverTxResponse } from '@cosmjs/stargate';
import { getSigningTwilightprojectClient, twilightproject } from 'src/codegen';
import { chainId, twilightRpcUrl } from './constants';
import { MsgRegisterBtcDepositAddress, MsgWithdrawBtcRequest } from 'src/codegen/nyks/bridge/tx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export const useTwilightRpcWithCosmjs = () => {
  const queryClient = useQueryClient();

  const signAndBroadcastRegisterBtcAddressTx = async (msg: MsgRegisterBtcDepositAddress) => {
    const signingClient = await getSigningClient();
    if (signingClient === undefined) return;
    const { registerBtcDepositAddress } = twilightproject.nyks.bridge.MessageComposer.withTypeUrl;
    const msgRegisterBtcDepositAddress = registerBtcDepositAddress({
      depositAddress: msg.depositAddress,
      twilightDepositAddress: msg.twilightDepositAddress,
    });
    const gasPrice = GasPrice.fromString('1nyks');
    const gasEstimation = await signingClient.simulate(
      msg.twilightDepositAddress,
      [msgRegisterBtcDepositAddress],
      '',
    );
    const fee = calculateFee(Math.round(gasEstimation * 1.3), gasPrice);
    return signingClient.signAndBroadcast(
      msg.twilightDepositAddress,
      [msgRegisterBtcDepositAddress],
      fee,
    );
  };

  const {
    data: msgBtcDepositAddressResponseData,
    error: msgBtcDepositAddressResponseError,
    status: msgBtcDepositAddressResponseStatus,
    mutate: registerBtcAddressOnNyks,
  } = useMutation({
    mutationFn: signAndBroadcastRegisterBtcAddressTx,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['registered_btc_deposit_address_by_twilight_address'],
      });
    },
  });

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
    msgBtcDepositAddressResponseData,
    msgBtcDepositAddressResponseError,
    msgBtcDepositAddressResponseStatus,
    withdrawBtcFromNyks,
    msgBtcWithdrawResponseData,
    msgBtcWithdrawResponseError,
    msgBtcWithdrawResponseStatus,
    getTransactionStatus,
  };
};
