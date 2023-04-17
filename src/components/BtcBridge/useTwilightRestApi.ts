import {
  ProposalTypeBtcDeposit,
  ProposalTypeBtcWithdraw,
  RegisteredBtcDepositAddress,
  RegisteredReserveScriptsResponse,
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

  const registeredBtcDepositAddressQuery = useQuery<
    RegisteredBtcDepositAddress,
    AxiosError,
    RegisteredBtcDepositAddress,
    string[]
  >({
    queryKey: ['registered_btc_deposit_address_by_twilight_address', BTC_DEPOSIT_ADDRESS_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    enabled: !!twilightAddress,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const RESERVE_SCRIPT_ADDRESS_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/bridge/registered_reserve_scripts`;

  const registeredReserveScriptsQuery = useQuery<
    RegisteredReserveScriptsResponse,
    AxiosError,
    RegisteredReserveScriptsResponse,
    string[]
  >({
    queryKey: ['registered_reserve_scripts', RESERVE_SCRIPT_ADDRESS_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: false,
  });

  const ATTESTATIONS_PROPOSAL_TYPE_BTC_DEPOSIT_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT`;

  const proposalTypeBtcDepositQuery = useQuery<
    ProposalTypeBtcDeposit,
    AxiosError,
    ProposalTypeBtcDeposit,
    string[]
  >({
    queryKey: ['attestations', ATTESTATIONS_PROPOSAL_TYPE_BTC_DEPOSIT_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    enabled: !!twilightAddress,
    refetchInterval: 5000,
  });

  const ATTESTATIONS_PROPOSAL_TYPE_BTC_WITHDRAW_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_WITHDRAW`;

  const proposalTypeBtcWithdrawQuery = useQuery<
    ProposalTypeBtcWithdraw,
    AxiosError,
    ProposalTypeBtcWithdraw,
    string[]
  >({
    queryKey: ['attestations', ATTESTATIONS_PROPOSAL_TYPE_BTC_WITHDRAW_ENDPOINT],
    queryFn: queryFunctionWithAxios,
    enabled: !!twilightAddress,
    refetchInterval: 5000,
  });

  return {
    registeredBtcDepositAddressQuery,
    registeredReserveScriptsQuery,
    proposalTypeBtcDepositQuery,
    proposalTypeBtcWithdrawQuery,
  };
};
