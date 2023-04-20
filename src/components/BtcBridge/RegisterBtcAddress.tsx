import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTwilightRestApi } from './useTwilightRestApi';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from './useValidateUserInputs';
import { AxiosError } from 'axios';

export function RegisterBtcAddress({ twilightAddress }: { twilightAddress: string }) {
  const [btcDepositAddress, setBtcDepositAddress] = useState('');

  const { registeredBtcDepositAddressQuery, hasRegisteredBtcDepositAddress } = useTwilightRestApi({
    twilightAddress,
  });
  const { registerBtcDepositAddressMutation, getTransactionStatus } = useTwilightRpcWithCosmjs();
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
      {!hasRegisteredBtcDepositAddress() ? (
        <Box>
          <Typography variant="h5" component="div" color="text.secondary" mt={1} mb={1}>
            Register bitcoin address
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Register Bitcoin Address"
              placeholder="Bitcoin address for registration on NYKS"
              variant="outlined"
              type="text"
              size="small"
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

          {registerBtcDepositAddressMutation.status === 'error' &&
          registerBtcDepositAddressMutation.error instanceof Error ? (
            <Typography variant="body2" color="error">
              {registerBtcDepositAddressMutation.error.message}
            </Typography>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            size="small"
            onClick={handleRegisterBtcAddressOnNyks}
            disabled={registerBtcDepositAddressMutation.status === 'loading'}
          >
            {!(registerBtcDepositAddressMutation.status === 'loading')
              ? 'Register BTC address on NYKS'
              : 'Loading...'}
          </Button>
        </Box>
      ) : null}

      {registerBtcDepositAddressMutation.status === 'success' ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            MsgRegisterBtcDepositAddress Tx Id:
          </Typography>

          <Link
            href={`http://nyks.twilight-explorer.com/transaction/${registerBtcDepositAddressMutation.data.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {registerBtcDepositAddressMutation.data.transactionHash}
          </Link>

          <Typography component="div" mt={2} mb={2}>
            Status - {getTransactionStatus(registerBtcDepositAddressMutation.data)}
          </Typography>
        </Box>
      ) : null}
    </>
  );
}
