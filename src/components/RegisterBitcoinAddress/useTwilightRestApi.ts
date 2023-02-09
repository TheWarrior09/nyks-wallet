import { useQueryWithAxiosGet } from 'src/hooks';
import {
  IProposalTypeBtcDeposit,
  IRegisteredBTCDeopsitAddress,
  IReserveScriptAddressResponse,
} from './btcWalletTypes';
import { twilightRestUrl } from './constants';

interface IuseTwilightRestApi {
  twilightAddress: string | undefined;
}

export const useTwilightRestApi = ({ twilightAddress }: IuseTwilightRestApi) => {
  const btcDepositAddressEndpoint = `${twilightRestUrl}twilight-project/nyks/bridge/registered_btc_deposit_address_by_twilight_address/${twilightAddress}`;

  const {
    data: registeredBTCDepositAddressData,
    error: registeredBTCDepositAddressError,
    status: registeredBTCDepositAddressStatus,
    fetchStatus: registeredBTCDepositAddressFetchStatus,
    refetch: refetchRegisteredBTCDepositAddress,
  } = useQueryWithAxiosGet<IRegisteredBTCDeopsitAddress>({
    queryKey: ['registered_btc_deposit_address_by_twilight_address', twilightAddress ?? ''],
    url: btcDepositAddressEndpoint,
    config: {
      enabled: !!twilightAddress,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  });

  const reserveScriptAddressesEndpoint = `${twilightRestUrl}twilight-project/nyks/bridge/registered_reserve_scripts`;

  const {
    data: reserveScriptAddressesData,
    error: reserveScriptAddressesError,
    status: reserveScriptAddressesStatus,
    fetchStatus: reserveScriptAddressesFetchStatus,
    refetch: refetchReserveScriptAddresses,
  } = useQueryWithAxiosGet<IReserveScriptAddressResponse>({
    queryKey: ['registered_reserve_scripts'],
    url: reserveScriptAddressesEndpoint,
    config: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      enabled: false,
    },
  });

  const attestationsPROPOSAL_TYPE_BTC_DEPOSITEndpoint = `${twilightRestUrl}twilight-project/nyks/nyks/attestations?proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT`;

  const {
    data: proposalTypeBtcDepositData,
    error: proposalTypeBtcDepositError,
    status: proposalTypeBtcDepositStatus,
    fetchStatus: proposalTypeBtcDepositFetchStatus,
  } = useQueryWithAxiosGet<IProposalTypeBtcDeposit>({
    queryKey: ['attestations', 'proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT', twilightAddress ?? ''],
    url: attestationsPROPOSAL_TYPE_BTC_DEPOSITEndpoint,
    config: {
      enabled: !!twilightAddress,
      refetchInterval: 5000,
    },
  });

  return {
    registeredBTCDepositAddressData,
    registeredBTCDepositAddressError,
    registeredBTCDepositAddressStatus,
    registeredBTCDepositAddressFetchStatus,
    refetchRegisteredBTCDepositAddress,
    reserveScriptAddressesData,
    reserveScriptAddressesError,
    reserveScriptAddressesStatus,
    reserveScriptAddressesFetchStatus,
    refetchReserveScriptAddresses,
    proposalTypeBtcDepositData,
    proposalTypeBtcDepositError,
    proposalTypeBtcDepositStatus,
    proposalTypeBtcDepositFetchStatus,
  };
};
