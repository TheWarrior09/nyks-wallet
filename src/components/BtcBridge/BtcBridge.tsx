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
  Typography,
} from '@mui/material';
import { coinDenom } from './constants';
import { useTwilightRestApi } from './useTwilightRestApi';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useKeplrWallet } from './useKeplrWallet';
import { ProposalTypeBtcDeposit } from './btcWalletTypes';
import { AccountData } from '@cosmjs/proto-signing';
import { RegisterBtcAddress } from './RegisterBtcAddress';
import { WithdrawBtc } from './WithdrawBtc';

export const RESERVE_ADDRESS = '1JRhv7zRN9xCyTntYT5nuupg7JMsE7YocL';

export default function BtcBridge() {
  const { connectKeplr, getAllBalancesQuery, getAccountsQuery, keplrConnected, disconnectKeplr } =
    useKeplrWallet();

  const twilightAddress = getAccountsQuery.data?.[0].address;

  const {
    registeredBtcDepositAddressQuery,
    registeredReserveScriptsQuery,
    proposalTypeBtcDepositQuery,
  } = useTwilightRestApi({ twilightAddress });

  const { registerBtcDepositAddressMutation, withdrawBtcRequestMutation, getTransactionStatus } =
    useTwilightRpcWithCosmjs();

  const handleFetchRegisteredReserveScripts = () => registeredReserveScriptsQuery.refetch();

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

      {twilightAddress ? (
        <>
          <RegisterBtcAddress twilightAddress={twilightAddress} />
          <WithdrawBtc twilightAddress={twilightAddress} />
        </>
      ) : null}

      <Box>
        <Typography mt={2} mb={2}>
          Nyks BTC balance shown after 5 blocks conformation on BTC blockchain.
        </Typography>
      </Box>

      {proposalTypeBtcDepositQuery.data ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: 2 }}>
            MsgConfirmBtcDeposit
          </Typography>

          <BTCDepositProposalTable
            proposalTypeBtcDepositData={proposalTypeBtcDepositQuery.data}
            accountInfo={getAccountsQuery.data?.[0]}
          />
        </Box>
      ) : null}

      {proposalTypeBtcDepositQuery.data ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: 2 }}>
            MsgConfirmBtcWithdraw
          </Typography>

          <BTCWithdrawProposalTable
            proposalTypeBtcWithdrawData={proposalTypeBtcDepositQuery.data}
            accountInfo={getAccountsQuery.data?.[0]}
          />
        </Box>
      ) : null}
    </>
  );

  const renderResults = (
    <>
      <Box>
        <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
          Keplr wallet status: {keplrConnected ? 'Connected' : 'Disconnected'}
        </Typography>
      </Box>

      {twilightAddress ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Twilight address:
          </Typography>
          <pre>{twilightAddress}</pre>
        </Box>
      ) : null}

      {getAllBalancesQuery.data ? (
        <Box>
          {!getAllBalancesQuery.data.find((item) => item.denom === coinDenom)?.amount ? (
            <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
              Nyks chain balance is empty. Please deposit some tokens or request some from faucet.
            </Typography>
          ) : (
            <>
              <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
                Balance:
              </Typography>
              <pre>
                {getAllBalancesQuery.data.map((item) => (
                  <div key={item.denom}>
                    {item.denom}: {item.amount}
                  </div>
                ))}
              </pre>
            </>
          )}
        </Box>
      ) : null}

      {registeredBtcDepositAddressQuery.status === 'success' &&
      registeredBtcDepositAddressQuery.data?.depositAddress ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin address:
          </Typography>
          <pre>{registeredBtcDepositAddressQuery.data.depositAddress}</pre>
          <FormControlLabel
            control={<Checkbox checked color="success" />}
            label="This Bitcoin address is registered on the Nyks testnet with your twilight address."
          />

          <Typography component="div" mt={2} mb={2}>
            Please deposit your desired amount of BTC from address
            <pre>{`"${registeredBtcDepositAddressQuery.data.depositAddress}"`}</pre> to any of the
            reserve script address.
          </Typography>
        </Box>
      ) : null}

      {registerBtcDepositAddressMutation.status === 'success' &&
      registerBtcDepositAddressMutation.data ? (
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

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleFetchRegisteredReserveScripts}
        >
          Get reserve script address
        </Button>
      </Box>

      {registeredReserveScriptsQuery.status === 'success' ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Reserve script addresses:
          </Typography>
          <pre>{JSON.stringify(registeredReserveScriptsQuery.data?.scripts, null, 2)}</pre>
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

function BTCWithdrawProposalTable({
  proposalTypeBtcWithdrawData,
  accountInfo,
}: {
  proposalTypeBtcWithdrawData: ProposalTypeBtcDeposit | undefined;
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
          {proposalTypeBtcWithdrawData?.attestations
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
