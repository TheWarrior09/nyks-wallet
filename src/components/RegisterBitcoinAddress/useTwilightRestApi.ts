import { useQueryWithAxiosGet } from 'src/hooks';
import {
  IPROPOSAL_TYPE_BTC_DEPOSIT,
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
      keepPreviousData: true,
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
    data: PROPOSAL_TYPE_BTC_DEPOSITData,
    error: PROPOSAL_TYPE_BTC_DEPOSITError,
    status: PROPOSAL_TYPE_BTC_DEPOSITStatus,
    fetchStatus: PROPOSAL_TYPE_BTC_DEPOSITFetchStatus,
  } = useQueryWithAxiosGet<IPROPOSAL_TYPE_BTC_DEPOSIT>({
    queryKey: ['attestations', 'proposal_type=PROPOSAL_TYPE_BTC_DEPOSIT'],
    url: attestationsPROPOSAL_TYPE_BTC_DEPOSITEndpoint,
    config: { enabled: !!twilightAddress, refetchInterval: 10000 },
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
    PROPOSAL_TYPE_BTC_DEPOSITData,
    PROPOSAL_TYPE_BTC_DEPOSITError,
    PROPOSAL_TYPE_BTC_DEPOSITStatus,
    PROPOSAL_TYPE_BTC_DEPOSITFetchStatus,
  };
};
