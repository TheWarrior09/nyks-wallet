import {
  ProposalTypeBtcDeposit,
  ProposalTypeBtcWithdraw,
  RegisteredBtcDepositAddress,
  RegisteredReserveAddressesResponse,
} from './btcWalletTypes';
import { twilightRestUrl } from './constants';
import { useQuery } from '@tanstack/react-query';
import { queryFunctionWithAxios } from './utils';
import { AxiosError } from 'axios';

interface UseTwilightRestApi {
  twilightAddress: string | undefined;
}

export const useTwilightRestApi = ({ twilightAddress }: UseTwilightRestApi) => {
  const BTC_DEPOSIT_ADDRESS_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/bridge/registered_btc_deposit_address_by_twilight_address/${twilightAddress}`;

  const registeredBtcDepositAddressQuery = useQuery<RegisteredBtcDepositAddress>({
    queryKey: ['registered_btc_deposit_address_by_twilight_address', BTC_DEPOSIT_ADDRESS_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    enabled: !!twilightAddress,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const REGISTERED_RESERVE_ADDRESS_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/bridge/registered_reserve_addresses`;

  const registeredReserveAddressesQuery = useQuery<RegisteredReserveAddressesResponse>({
    queryKey: ['registered_reserve_addresses', REGISTERED_RESERVE_ADDRESS_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: false,
  });

  const ATTESTATIONS_PROPOSAL_TYPE_BTC_DEPOSIT_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT`;

  const proposalTypeBtcDepositQuery = useQuery({
    queryKey: ['attestations', ATTESTATIONS_PROPOSAL_TYPE_BTC_DEPOSIT_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    enabled: !!twilightAddress,
    refetchInterval: 5000,
    select: (data: ProposalTypeBtcDeposit) =>
      data.attestations.length > 0
        ? data.attestations.filter(
            (attestation) => attestation.proposal.twilightDepositAddress === twilightAddress,
          )
        : [],
  });

  const ATTESTATIONS_PROPOSAL_TYPE_BTC_WITHDRAW_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_WITHDRAW`;

  const proposalTypeBtcWithdrawQuery = useQuery({
    queryKey: ['attestations', ATTESTATIONS_PROPOSAL_TYPE_BTC_WITHDRAW_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    enabled: !!twilightAddress,
    refetchInterval: 5000,
    select: (data: ProposalTypeBtcWithdraw) =>
      data.attestations.length > 0
        ? data.attestations.filter(
            (attestation) => attestation.proposal.twilightDepositAddress === twilightAddress,
          )
        : [],
  });

  const hasRegisteredBtcDepositAddress = () => {
    const isBtcDepositAddressRegistered =
      registeredBtcDepositAddressQuery.status === 'error' &&
      registeredBtcDepositAddressQuery.error instanceof AxiosError &&
      registeredBtcDepositAddressQuery.error.response?.data.message ===
        "Given twilightDepositAddress doesn't exist: invalid: invalid request";
    return !isBtcDepositAddressRegistered;
  };

  return {
    registeredBtcDepositAddressQuery,
    registeredReserveAddressesQuery,
    proposalTypeBtcDepositQuery,
    proposalTypeBtcWithdrawQuery,
    hasRegisteredBtcDepositAddress,
  };
};
