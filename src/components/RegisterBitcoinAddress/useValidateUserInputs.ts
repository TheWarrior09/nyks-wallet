import validate from 'bitcoin-address-validation';
import { useState } from 'react';

function validateBTCAddress(address: string) {
  return validate(address);
}

interface IuseValidateUserInputs {
  transferToAddress: string;
}

export const useValidateUserInputs = ({ transferToAddress }: IuseValidateUserInputs) => {
  const [userAddressInputState, setUserAddressInputState] = useState<boolean>();

  const checkBTCAddressValidity = () => {
    const isAddressValid = validateBTCAddress(transferToAddress);
    setUserAddressInputState(isAddressValid);
  };

  return {
    checkBTCAddressValidity,
    userAddressInputState,
  };
};
