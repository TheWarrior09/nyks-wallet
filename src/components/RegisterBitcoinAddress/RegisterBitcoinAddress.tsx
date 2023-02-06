import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { coinDenom } from './constants';
import { useTwilightRestApi } from './useTwilightRestApi';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from './useValidateUserInputs';
import { useKeplrWallet } from './useKeplrWallet';
import { IPROPOSAL_TYPE_BTC_DEPOSIT } from './btcWalletTypes';
import { AccountData } from '@cosmjs/proto-signing';

export default function RegisterBitcoinAddress() {
  const [BTCDepositAddress, setBTCDepositAddress] = useState('');

  const { connectKeplr, accountBalanceInfo, accountInfo } = useKeplrWallet();

  const {
    registeredBTCDepositAddressData,
    registeredBTCDepositAddressStatus,
    registeredBTCDepositAddressError,
    refetchRegisteredBTCDepositAddress,
    reserveScriptAddressesData,
    reserveScriptAddressesStatus,
    refetchReserveScriptAddresses,
    PROPOSAL_TYPE_BTC_DEPOSITData,
  } = useTwilightRestApi({ twilightAddress: accountInfo?.address });

  const {
    registerBtcAddressOnNyks,
    txIdNYKS,
    isDepositAddressRegistered,
    registerBtcAddressOnNyksLoadingState,
  } = useTwilightRpcWithCosmjs({
    btcAddress: BTCDepositAddress,
    twilightAddress: accountInfo?.address,
  });

  const { checkBTCAddressValidity, userAddressInputState } = useValidateUserInputs({
    transferToAddress: BTCDepositAddress,
  });

  useEffect(() => {
    if (isDepositAddressRegistered) {
      refetchRegisteredBTCDepositAddress();
    }
  }, [isDepositAddressRegistered, refetchRegisteredBTCDepositAddress]);

  const handleTransferToAddressChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBTCDepositAddress(event.target.value);

  const handleRefetchReserveScriptAddresses = () => refetchReserveScriptAddresses();

  const handleRegisterBtcAddressOnNyks = async () => {
    await registerBtcAddressOnNyks();
  };

  const renderInputs = (
    <>
      <Box>
        <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={connectKeplr}>
          Connect Keplr wallet
        </Button>
      </Box>

      {registeredBTCDepositAddressStatus === 'error' &&
      registeredBTCDepositAddressError?.response?.data.message ===
        "Given twilightDepositAddress doesn't exist: invalid: invalid request" ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={1}>
            Register bitcoin address
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Bitcoin address"
              placeholder="Bitcoin address for registration on NYKS"
              variant="outlined"
              type="text"
              onChange={handleTransferToAddressChange}
              value={BTCDepositAddress}
              onBlur={checkBTCAddressValidity}
              error={typeof userAddressInputState === 'undefined' ? false : !userAddressInputState}
              sx={{ width: '450px' }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleRegisterBtcAddressOnNyks}
            disabled={registerBtcAddressOnNyksLoadingState}
          >
            {registerBtcAddressOnNyksLoadingState === false
              ? 'Register BTC address on NYKS'
              : 'Loading...'}
          </Button>
        </Box>
      ) : null}

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleRefetchReserveScriptAddresses}
        >
          Get reserve script address
        </Button>
      </Box>

      {PROPOSAL_TYPE_BTC_DEPOSITData ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" id="tableTitle" component="div" sx={{ mb: 2 }}>
            Msg Confirm Btc Deposit
          </Typography>

          <BTCDepositProposalTable
            PROPOSAL_TYPE_BTC_DEPOSITData={PROPOSAL_TYPE_BTC_DEPOSITData}
            accountInfo={accountInfo}
          />
        </Box>
      ) : null}
    </>
  );

  const renderResults = (
    <>
      {accountInfo ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Nyks address:
          </Typography>
          <pre>{accountInfo.address}</pre>
        </Box>
      ) : null}

      {accountBalanceInfo ? (
        <Box>
          {!accountBalanceInfo.find((item) => item.denom === coinDenom)?.amount ? (
            <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
              Nyks chain balance is empty. Please deposit some tokens or request some from faucet.
            </Typography>
          ) : (
            <>
              <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
                Nyks chain balance:
              </Typography>
              <pre>
                {accountBalanceInfo.map((item) => (
                  <div key={item.denom}>
                    {item.denom}: {item.amount}
                  </div>
                ))}
              </pre>
            </>
          )}
        </Box>
      ) : null}

      {registeredBTCDepositAddressStatus === 'success' &&
      registeredBTCDepositAddressData?.depositAddress ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin address:
          </Typography>
          <pre>{registeredBTCDepositAddressData.depositAddress}</pre>
          <FormControlLabel
            control={<Checkbox checked color="success" />}
            label="This Bitcoin address is registered on the NYKS blockchain with your twilight address."
          />

          <Typography mt={2} mb={2}>
            Once you deposit BTC from address{' '}
            {`"${registeredBTCDepositAddressData.depositAddress}"`} to reserve script address, NYKS
            BTC balance shown after 5 blocks conforimation on BTC blockchain.
          </Typography>
        </Box>
      ) : null}

      {txIdNYKS ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            NYKS transaction Id:
          </Typography>

          <Link
            href={`http://nyks.twilight-explorer.com/transaction/${txIdNYKS}`}
            target="_blank"
            rel="noreferrer"
          >
            {txIdNYKS}
          </Link>
        </Box>
      ) : null}

      {reserveScriptAddressesStatus === 'success' ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Reserve script addresses:
          </Typography>
          <pre>{JSON.stringify(reserveScriptAddressesData?.scripts, null, 2)}</pre>
        </Box>
      ) : null}
    </>
  );

  return (
    <Container maxWidth="xl" component="section">
      <Typography variant="h4" component="h1" color="text.secondary" mt={2} mb={2}>
        Register bitcoin address on NYKS.
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={6} md={6}>
          {renderInputs}
        </Grid>
        <Grid item xs={6} md={6}>
          {renderResults}
        </Grid>
      </Grid>
    </Container>
  );
}

function BTCDepositProposalTable({
  PROPOSAL_TYPE_BTC_DEPOSITData,
  accountInfo,
}: {
  PROPOSAL_TYPE_BTC_DEPOSITData: IPROPOSAL_TYPE_BTC_DEPOSIT | undefined;
  accountInfo: AccountData | undefined;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Votes</TableCell>
            <TableCell>Observed</TableCell>
            <TableCell>Height</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {PROPOSAL_TYPE_BTC_DEPOSITData?.attestations
            .filter((item) => item.proposal.twilightDepositAddress === accountInfo?.address)
            .map((row, index) => (
              <TableRow key={row.height} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.proposal.depositAmount}</TableCell>
                <TableCell>{row.votes.length}</TableCell>
                <TableCell>{row.observed.toString()}</TableCell>
                <TableCell>{row.proposal.height}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
