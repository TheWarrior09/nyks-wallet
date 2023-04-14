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
import { useState } from 'react';
import { coinDenom } from './constants';
import { useTwilightRestApi } from './useTwilightRestApi';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from './useValidateUserInputs';
import { useKeplrWallet } from './useKeplrWallet';
import { ProposalTypeBtcDeposit } from './btcWalletTypes';
import { AccountData } from '@cosmjs/proto-signing';
import Long from 'long';

const RESERVE_ADDRESS = '1JRhv7zRN9xCyTntYT5nuupg7JMsE7YocL';

export default function RegisterBitcoinAddress() {
  const [btcDepositAddress, setBtcDepositAddress] = useState('');
  const [btcWithdrawalAddress, setBtcWithdrawalAddress] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  const { connectKeplr, accountBalanceInfo, accountInfo, keplrConnected, disconnectKeplr } =
    useKeplrWallet();

  const {
    registeredBtcDepositAddressData,
    registeredBtcDepositAddressStatus,
    registeredBtcDepositAddressError,
    refetchRegisteredBtcDepositAddress,
    reserveScriptAddressesData,
    reserveScriptAddressesStatus,
    refetchReserveScriptAddresses,
    proposalTypeBtcDepositData,
  } = useTwilightRestApi({ twilightAddress: accountInfo?.address });

  const {
    registerBtcAddressOnNyks,
    msgBtcDepositAddressResponseData,
    msgBtcDepositAddressResponseError,
    msgBtcDepositAddressResponseStatus,
    withdrawBtcFromNyks,
    msgBtcWithdrawResponseData,
    msgBtcWithdrawResponseError,
    msgBtcWithdrawResponseStatus,
    getTransactionStatus,
  } = useTwilightRpcWithCosmjs();

  const {
    checkBtcAddressValidity: checkBtcDepositAddressValidity,
    userInputAddressState: userDepositAddressInputState,
  } = useValidateUserInputs({
    btcAddress: btcDepositAddress,
  });

  const {
    checkBtcAddressValidity: checkBtcWithdrawalAddressValidity,
    userInputAddressState: userWithdrawalAddressInputState,
  } = useValidateUserInputs({
    btcAddress: btcWithdrawalAddress,
  });

  const handleTransferToAddressChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBtcDepositAddress(event.target.value);

  const handleWithdrawalAddressChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBtcWithdrawalAddress(event.target.value);

  const handleWithdrawalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWithdrawalAmount(event.target.valueAsNumber);

  const handleRefetchReserveScriptAddresses = () => refetchReserveScriptAddresses();

  const handleRegisterBtcAddressOnNyks = async () => {
    registerBtcAddressOnNyks({
      depositAddress: btcDepositAddress,
      twilightDepositAddress: accountInfo?.address!,
    });
  };

  const handleWithdrawalBtcFromNyks = () => {
    withdrawBtcFromNyks({
      withdrawAddress: btcWithdrawalAddress,
      withdrawAmount: Long.fromNumber(withdrawalAmount),
      reserveAddress: RESERVE_ADDRESS,
      twilightAddress: accountInfo?.address!,
    });
  };

  const getBtcBalance = () => {
    const btcBalanceString = accountBalanceInfo?.find((balance) => balance.denom === 'btc')?.amount;
    return typeof btcBalanceString === 'undefined' ? 0 : Number(btcBalanceString);
  };

  const renderInputs = (
    <>
      <Box>
        {!keplrConnected ? (
          <Button variant="contained" color="primary" sx={{ my: 2 }} onClick={connectKeplr}>
            Connect Keplr wallet
          </Button>
        ) : (
          <Button variant="contained" color="primary" sx={{ my: 2 }} onClick={disconnectKeplr}>
            Disconnect keplr wallet
          </Button>
        )}
      </Box>

      {registeredBtcDepositAddressStatus === 'error' &&
      registeredBtcDepositAddressError?.response?.data.message ===
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
            disabled={msgBtcDepositAddressResponseStatus === 'loading'}
          >
            {!(msgBtcDepositAddressResponseStatus === 'loading')
              ? 'Register BTC address on NYKS'
              : 'Loading...'}
          </Button>
        </Box>
      ) : null}

      <Box>
        <Typography mt={2} mb={2}>
          Nyks BTC balance shown after 5 blocks conformation on BTC blockchain.
        </Typography>
      </Box>

      {proposalTypeBtcDepositData ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: 2 }}>
            MsgConfirmBtcDeposit
          </Typography>

          <BTCDepositProposalTable
            proposalTypeBtcDepositData={proposalTypeBtcDepositData}
            accountInfo={accountInfo}
          />
        </Box>
      ) : null}

      {accountBalanceInfo
        ? getBtcBalance() > 0 && (
            <Box>
              <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={1}>
                Bitcoin withdraw address
              </Typography>

              <Box component="form" noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Bitcoin withdraw address"
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
                disabled={msgBtcWithdrawResponseStatus === 'loading'}
              >
                {!(msgBtcWithdrawResponseStatus === 'loading')
                  ? 'Withdraw BTC from NYKS'
                  : 'Loading...'}
              </Button>
            </Box>
          )
        : null}
    </>
  );

  const renderResults = (
    <>
      <Box>
        <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
          Keplr wallet status: {keplrConnected ? 'Connected' : 'Disconnected'}
        </Typography>
      </Box>

      {accountInfo ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Twilight address:
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
                Balance:
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

      {registeredBtcDepositAddressStatus === 'success' &&
      registeredBtcDepositAddressData?.depositAddress ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin address:
          </Typography>
          <pre>{registeredBtcDepositAddressData.depositAddress}</pre>
          <FormControlLabel
            control={<Checkbox checked color="success" />}
            label="This Bitcoin address is registered on the Nyks testnet with your twilight address."
          />

          <Typography component="div" mt={2} mb={2}>
            Please deposit your desired amount of BTC from address
            <pre>{`"${registeredBtcDepositAddressData.depositAddress}"`}</pre> to any of the reserve
            script address.
          </Typography>
        </Box>
      ) : null}

      {msgBtcDepositAddressResponseStatus === 'success' && msgBtcDepositAddressResponseData ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            MsgRegisterBtcDepositAddress Tx Id:
          </Typography>

          <Link
            href={`http://nyks.twilight-explorer.com/transaction/${msgBtcDepositAddressResponseData.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {msgBtcDepositAddressResponseData.transactionHash}
          </Link>

          <Typography component="div" mt={2} mb={2}>
            Status - {getTransactionStatus(msgBtcDepositAddressResponseData)}
          </Typography>
        </Box>
      ) : null}

      {msgBtcWithdrawResponseStatus === 'success' && msgBtcWithdrawResponseData ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            MsgWithdrawBtcRequest Tx Id:
          </Typography>

          <Link
            href={`http://nyks.twilight-explorer.com/transaction/${msgBtcWithdrawResponseData.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {msgBtcWithdrawResponseData.transactionHash}
          </Link>

          <Typography component="div" mt={2} mb={2}>
            Status - {getTransactionStatus(msgBtcWithdrawResponseData)}
          </Typography>
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
        Register Bitcoin Address on Nyks
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
  proposalTypeBtcDepositData,
  accountInfo,
}: {
  proposalTypeBtcDepositData: ProposalTypeBtcDeposit | undefined;
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
          {proposalTypeBtcDepositData?.attestations
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
