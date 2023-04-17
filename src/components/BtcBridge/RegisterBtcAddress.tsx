import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTwilightRestApi } from './useTwilightRestApi';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from './useValidateUserInputs';

export function RegisterBtcAddress({ twilightAddress }: { twilightAddress: string }) {
  const [btcDepositAddress, setBtcDepositAddress] = useState('');

  const { registeredBtcDepositAddressQuery } = useTwilightRestApi({ twilightAddress });
  const { registerBtcDepositAddressMutation } = useTwilightRpcWithCosmjs();
  const {
    checkBtcAddressValidity: checkBtcDepositAddressValidity,
    userInputAddressState: userDepositAddressInputState,
  } = useValidateUserInputs({
    btcAddress: btcDepositAddress,
  });

  const handleTransferToAddressChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBtcDepositAddress(event.target.value);

  const handleRegisterBtcAddressOnNyks = async () => {
    registerBtcDepositAddressMutation.mutate({
      depositAddress: btcDepositAddress,
      twilightDepositAddress: twilightAddress!,
    });
  };

  return (
    <>
      {registeredBtcDepositAddressQuery.status === 'error' &&
      registeredBtcDepositAddressQuery.error.response?.data.message ===
        "Given twilightDepositAddress doesn't exist: invalid: invalid request" ? (
        <Box>
          <Typography variant="h5" component="div" color="text.secondary" mt={2} mb={1}>
            Register bitcoin address
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Register Bitcoin Address"
              placeholder="Bitcoin address for registration on NYKS"
              variant="outlined"
              type="text"
              onChange={handleTransferToAddressChange}
              value={btcDepositAddress}
              onBlur={checkBtcDepositAddressValidity}
              error={
                typeof userDepositAddressInputState === 'undefined'
                  ? false
                  : !userDepositAddressInputState
              }
              sx={{ width: '450px' }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleRegisterBtcAddressOnNyks}
            disabled={registerBtcDepositAddressMutation.status === 'loading'}
          >
            {!(registerBtcDepositAddressMutation.status === 'loading')
              ? 'Register BTC address on NYKS'
              : 'Loading...'}
          </Button>
        </Box>
      ) : null}
    </>
  );
}
