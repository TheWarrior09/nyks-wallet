import { useEffect, useState } from 'react';
import { IRegisteredBTCDeopsitAddress, IReserveScriptAddressResponse } from './btcWalletTypes';
import { twilightRestUrl } from './constants';

interface IuseTwilightRestApi {
  twilightAddress: string | undefined;
}

export const useTwilightRestApi = ({ twilightAddress }: IuseTwilightRestApi) => {
  const [reserveScriptAddresses, setReserveScriptAddresses] =
    useState<IReserveScriptAddressResponse>();

  const [registeredBTCDepositAddress, setRegisteredBTCDepositAddress] =
    useState<IRegisteredBTCDeopsitAddress>();

  useEffect(() => {
    const getRegisterrdBTCDepositAddress = async () => {
      if (!twilightAddress) return;
      const btcDepositAddressEndpoint = `${twilightRestUrl}twilight-project/nyks/bridge/registered_btc_deposit_address_by_twilight_address/${twilightAddress}`;

      const btcDepositAddressQueryResponse = await fetch(btcDepositAddressEndpoint);
      const btcDepositAddressData = await btcDepositAddressQueryResponse.json();

      setRegisteredBTCDepositAddress(btcDepositAddressData);
    };

    getRegisterrdBTCDepositAddress();
  }, [twilightAddress]);

  const getBTCReserveAddress = async () => {
    const reserveScriptAddressesEndpoint = `${twilightRestUrl}twilight-project/nyks/bridge/registered_reserve_scripts`;
    const reserveAddressesQueryResponse = await fetch(reserveScriptAddressesEndpoint);
    const reserveScriptAddressesData = await reserveAddressesQueryResponse.json();
    setReserveScriptAddresses(reserveScriptAddressesData);
  };

  return { getBTCReserveAddress, reserveScriptAddresses, registeredBTCDepositAddress };
};
