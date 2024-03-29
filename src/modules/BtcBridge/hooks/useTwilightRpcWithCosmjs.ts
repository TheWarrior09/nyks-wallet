import { OfflineSigner } from '@cosmjs/proto-signing';
import { isDeliverTxSuccess, GasPrice, calculateFee, DeliverTxResponse } from '@cosmjs/stargate';
import { getSigningTwilightprojectClient, twilightproject } from 'src/codegen';
import { chainId, twilightRpcUrl } from '../constants';
import { MsgRegisterBtcDepositAddress, MsgWithdrawBtcRequest } from 'src/codegen/nyks/bridge/tx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getKeplr } from './useKeplrWallet';

async function getSigningClient() {
  try {
    const keplr = getKeplr();
    const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(chainId);
    const signingClient = await getSigningTwilightprojectClient({
      rpcEndpoint: twilightRpcUrl,
      signer: offlineSigner,
    });
    return signingClient;
  } catch (error) {
    throw error;
  }
}

const signAndBroadcastRegisterBtcAddressTx = async (msg: MsgRegisterBtcDepositAddress) => {
  const signingClient = await getSigningClient();
  const { registerBtcDepositAddress } = twilightproject.nyks.bridge.MessageComposer.withTypeUrl;
  const msgRegisterBtcDepositAddress = registerBtcDepositAddress({
    btcDepositAddress: msg.btcDepositAddress,
    btcSatoshiTestAmount: msg.btcSatoshiTestAmount,
    twilightStakingAmount: msg.twilightStakingAmount,
    twilightAddress: msg.twilightAddress,
  });
  const gasPrice = GasPrice.fromString('1nyks');
  const gasEstimation = await signingClient.simulate(
    msg.twilightAddress,
    [msgRegisterBtcDepositAddress],
    '',
  );
  const fee = calculateFee(Math.round(gasEstimation * 1.3), gasPrice);
  return signingClient.signAndBroadcast(msg.twilightAddress, [msgRegisterBtcDepositAddress], fee);
};

const signAndBroadcastWithdrawBtcTx = async (msg: MsgWithdrawBtcRequest) => {
  const signingClient = await getSigningClient();
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

export const useTwilightRpcWithCosmjs = () => {
  const queryClient = useQueryClient();

  const registerBtcDepositAddressMutation = useMutation({
    mutationFn: signAndBroadcastRegisterBtcAddressTx,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['registered_btc_deposit_address_by_twilight_address'],
      });
    },
  });

  const withdrawBtcRequestMutation = useMutation({
    mutationFn: signAndBroadcastWithdrawBtcTx,
  });

  const getTransactionStatus = (txResponse: DeliverTxResponse) =>
    isDeliverTxSuccess(txResponse) ? 'Success' : 'Failed';

  return {
    registerBtcDepositAddressMutation,
    withdrawBtcRequestMutation,
    getTransactionStatus,
  };
};
