import validate from 'bitcoin-address-validation';
import { useState } from 'react';

function validateBtcAddress(address: string) {
  return validate(address);
}

interface UseValidateUserInputs {
  btcAddress: string;
}

export const useValidateUserInputs = ({ btcAddress }: UseValidateUserInputs) => {
  const [userInputAddressState, setUserAddressInputState] = useState<boolean>();

  const checkBtcAddressValidity = () => {
    const isAddressValid = validateBtcAddress(btcAddress);
    setUserAddressInputState(isAddressValid);
  };

  return {
    checkBtcAddressValidity,
    userInputAddressState,
  };
};
