import { useQueryWithAxiosGet } from 'src/hooks';
import { IRegisteredBTCDeopsitAddress, IReserveScriptAddressResponse } from './btcWalletTypes';
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
  } = useQueryWithAxiosGet<IRegisteredBTCDeopsitAddress>({
    queryKey: ['registered_btc_deposit_address_by_twilight_address', twilightAddress ?? ''],
    url: btcDepositAddressEndpoint,
    config: {
      enabled: !!twilightAddress,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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

  return {
    registeredBTCDepositAddressData,
    registeredBTCDepositAddressError,
    registeredBTCDepositAddressStatus,
    registeredBTCDepositAddressFetchStatus,
    reserveScriptAddressesData,
    reserveScriptAddressesError,
    reserveScriptAddressesStatus,
    reserveScriptAddressesFetchStatus,
    refetchReserveScriptAddresses,
  };
};
