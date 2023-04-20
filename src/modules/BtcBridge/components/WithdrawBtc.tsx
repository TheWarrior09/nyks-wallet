import { Box, Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useTwilightRpcWithCosmjs } from '../hooks/useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from '../hooks/useValidateUserInputs';
import { useKeplrWallet } from '../hooks/useKeplrWallet';
import Long from 'long';

const RESERVE_ADDRESS = '14uEN8abvKA1zgYCpv8MWCUwAMLGBqdZGM';

export function WithdrawBtc({ twilightAddress }: { twilightAddress: string }) {
  const [btcWithdrawalAddress, setBtcWithdrawalAddress] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  const { getBtcBalanceOnNYKS } = useKeplrWallet();
  const { withdrawBtcRequestMutation, getTransactionStatus } = useTwilightRpcWithCosmjs();
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
          <Typography variant="h5" component="div" color="text.secondary" mt={1} mb={1}>
            Bitcoin withdraw address
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Bitcoin Withdraw Address"
              placeholder="Bitcoin address for withdrawal from NYKS"
              variant="outlined"
              type="text"
              size="small"
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
              size="small"
              onChange={handleWithdrawalAmountChange}
              value={withdrawalAmount}
              sx={{ ml: 1 }}
            />
          </Box>

          {withdrawBtcRequestMutation.status === 'error' &&
          withdrawBtcRequestMutation.error instanceof Error ? (
            <Typography variant="body2" color="error">
              {withdrawBtcRequestMutation.error.message}
            </Typography>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            size="small"
            onClick={handleWithdrawalBtcFromNyks}
            disabled={withdrawBtcRequestMutation.status === 'loading'}
          >
            {!(withdrawBtcRequestMutation.status === 'loading')
              ? 'Withdraw BTC from NYKS'
              : 'Loading...'}
          </Button>
        </Box>
      ) : null}

      {withdrawBtcRequestMutation.status === 'success' && withdrawBtcRequestMutation.data ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            MsgWithdrawBtcRequest Tx Id:
          </Typography>

          <Link
            href={`http://nyks.twilight-explorer.com/transaction/${withdrawBtcRequestMutation.data.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {withdrawBtcRequestMutation.data.transactionHash}
          </Link>

          <Typography component="div" mt={2} mb={2}>
            Status - {getTransactionStatus(withdrawBtcRequestMutation.data)}
          </Typography>
        </Box>
      ) : null}
    </>
  );
}