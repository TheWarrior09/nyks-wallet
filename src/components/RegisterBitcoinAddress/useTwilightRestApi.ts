import { useQueryWithAxiosGet } from 'src/hooks';
import {
  ProposalTypeBtcDeposit,
  ProposalTypeBtcWithdraw,
  RegisteredBtcDepositAddress,
  RegisteredReserveScriptsResponse,
} from './btcWalletTypes';
import { twilightRestUrl } from './constants';

interface UseTwilightRestApi {
  twilightAddress: string | undefined;
}

export const useTwilightRestApi = ({ twilightAddress }: UseTwilightRestApi) => {
  const BTC_DEPOSIT_ADDRESS_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/bridge/registered_btc_deposit_address_by_twilight_address/${twilightAddress}`;

  const registeredBtcDepositAddressQuery = useQueryWithAxiosGet<RegisteredBtcDepositAddress>({
    queryKey: ['registered_btc_deposit_address_by_twilight_address', twilightAddress ?? ''],
    url: BTC_DEPOSIT_ADDRESS_ENDPOINT,
    config: {
      enabled: !!twilightAddress,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  });

  const RESERVE_SCRIPT_ADDRESS_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/bridge/registered_reserve_scripts`;

  const registeredReserveScriptsQuery = useQueryWithAxiosGet<RegisteredReserveScriptsResponse>({
    queryKey: ['registered_reserve_scripts'],
    url: RESERVE_SCRIPT_ADDRESS_ENDPOINT,
    config: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      enabled: false,
    },
  });

  const ATTESTATIONS_PROPOSAL_TYPE_BTC_DEPOSIT_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT`;

  const proposalTypeBtcDepositQuery = useQueryWithAxiosGet<ProposalTypeBtcDeposit>({
    queryKey: ['attestations', 'proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT', twilightAddress ?? ''],
    url: ATTESTATIONS_PROPOSAL_TYPE_BTC_DEPOSIT_ENDPOINT,
    config: {
      enabled: !!twilightAddress,
      refetchInterval: 5000,
    },
  });

  const ATTESTATIONS_PROPOSAL_TYPE_BTC_WITHDRAW_ENDPOINT = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_WITHDRAW`;

  const proposalTypeBtcWithdrawQuery = useQueryWithAxiosGet<ProposalTypeBtcWithdraw>({
    queryKey: ['attestations', 'proposal_type=PROPOSAL_TYPE_BTC_WITHDRAW', twilightAddress ?? ''],
    url: ATTESTATIONS_PROPOSAL_TYPE_BTC_WITHDRAW_ENDPOINT,
    config: {
      enabled: !!twilightAddress,
      refetchInterval: 5000,
    },
  });

  return {
    registeredBtcDepositAddressQuery,
    registeredReserveScriptsQuery,
    proposalTypeBtcDepositQuery,
    proposalTypeBtcWithdrawQuery,
  };
};
