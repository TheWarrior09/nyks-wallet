import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from './useValidateUserInputs';
import { useKeplrWallet } from './useKeplrWallet';
import Long from 'long';
import { RESERVE_ADDRESS } from './BtcBridge';

export function WithdrawBtc({ twilightAddress }: { twilightAddress: string }) {
  const [btcWithdrawalAddress, setBtcWithdrawalAddress] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  const { getBtcBalanceOnNYKS } = useKeplrWallet();
  const { withdrawBtcRequestMutation } = useTwilightRpcWithCosmjs();
  const {
    checkBtcAddressValidity: checkBtcWithdrawalAddressValidity,
    userInputAddressState: userWithdrawalAddressInputState,
  } = useValidateUserInputs({
    btcAddress: btcWithdrawalAddress,
  });

  const handleWithdrawalAddressChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBtcWithdrawalAddress(event.target.value);

  const handleWithdrawalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWithdrawalAmount(event.target.valueAsNumber);

  const handleWithdrawalBtcFromNyks = () => {
    withdrawBtcRequestMutation.mutate({
      withdrawAddress: btcWithdrawalAddress,
      withdrawAmount: Long.fromNumber(withdrawalAmount),
      reserveAddress: RESERVE_ADDRESS,
      twilightAddress: twilightAddress!,
    });
  };
  return (
    <>
      {getBtcBalanceOnNYKS() > 0 ? (
        <Box>
          <Typography variant="h5" component="div" color="text.secondary" mt={2} mb={1}>
            Bitcoin withdraw address
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Bitcoin Withdraw Address"
              placeholder="Bitcoin address for withdrawal from NYKS"
              variant="outlined"
              type="text"
              onChange={handleWithdrawalAddressChange}
              value={btcWithdrawalAddress}
              onBlur={checkBtcWithdrawalAddressValidity}
              error={
                typeof userWithdrawalAddressInputState === 'undefined'
                  ? false
                  : !userWithdrawalAddressInputState
              }
              sx={{ width: '450px' }}
            />

            <TextField
              id="outlined-basic"
              label="Amount"
              placeholder="Bitcoin withdraw amount"
              variant="outlined"
              type="number"
              onChange={handleWithdrawalAmountChange}
              value={withdrawalAmount}
              sx={{ ml: 1 }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleWithdrawalBtcFromNyks}
            disabled={withdrawBtcRequestMutation.status === 'loading'}
          >
            {!(withdrawBtcRequestMutation.status === 'loading')
              ? 'Withdraw BTC from NYKS'
              : 'Loading...'}
          </Button>
        </Box>
      ) : null}
    </>
  );
}
