import validate from 'bitcoin-address-validation';
import { useState } from 'react';

export const useValidateUserInputs = ({ btcAddress }: { btcAddress: string }) => {
  const [userInputAddressState, setUserAddressInputState] = useState<boolean>();

  const checkBtcAddressValidity = () => {
    const isAddressValid = validate(btcAddress);
    setUserAddressInputState(isAddressValid);
  };

  return {
    checkBtcAddressValidity,
    userInputAddressState,
  };
};
