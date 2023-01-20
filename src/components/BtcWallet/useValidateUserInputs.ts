import { validateMnemonic } from 'bip39';
import validate from 'bitcoin-address-validation';
import { useState } from 'react';

function validateBTCAddress(address: string) {
  return validate(address);
}

interface IuseValidateUserInputs {
  transferToAddress: string;
  userMnemonicInput: string;
}

export const useValidateUserInputs = ({
  transferToAddress,
  userMnemonicInput,
}: IuseValidateUserInputs) => {
  const [userAddressInputState, setUserAddressInputState] = useState<boolean>();
  const [userMnemonicInputState, setUserMnemonicInputState] = useState<boolean>();

  const validateUserMnemonic = () => {
    const validate = validateMnemonic(userMnemonicInput);
    setUserMnemonicInputState(validate);
  };

  const checkBTCAddressValidity = () => {
    const isAddressValid = validateBTCAddress(transferToAddress);
    setUserAddressInputState(isAddressValid);
  };

  return {
    checkBTCAddressValidity,
    userAddressInputState,
    validateUserMnemonic,
    userMnemonicInputState,
  };
};
