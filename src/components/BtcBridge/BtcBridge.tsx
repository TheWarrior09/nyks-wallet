import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { AxiosError } from 'axios';

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
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={connectKeplr}
          >
            Connect Keplr wallet
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={disconnectKeplr}
          >
            Disconnect keplr wallet
          </Button>
        )}
      </Box>

      {twilightAddress ? (
        <>
          <RegisterBtcAddress twilightAddress={twilightAddress} />
          <WithdrawBtc twilightAddress={twilightAddress} />

          <Box>
            <Typography mt={2} mb={2}>
              Nyks BTC balance shown after 5 blocks conformation on BTC blockchain.
            </Typography>
          </Box>

          <BtcDepositProposalSection twilightAddress={twilightAddress} />
          <BtcWithdrawProposalSection twilightAddress={twilightAddress} />
        </>
      ) : null}
    </>
  );

  const renderResults = (
    <>
      <Box>
        <Typography variant="h6" component="div" color="text.secondary" mb={2}>
          Keplr wallet status: {keplrConnected ? 'Connected' : 'Disconnected'}
        </Typography>
      </Box>

      {twilightAddress ? (
        <>
          <Box>
            <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
              Twilight address:
            </Typography>
            <pre>{twilightAddress}</pre>
          </Box>

          <BalanceSection />
          <RegisteredBtcAddressSection twilightAddress={twilightAddress} />
        </>
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
          size="small"
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
        Bitcoin Bridge on Nyks
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

function BalanceSection() {
  const { getAllBalancesQuery, getNyksBalanceOnNYKS } = useKeplrWallet();

  return (
    <Box>
      <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
        Balance:{' '}
        {getAllBalancesQuery.status === 'success' &&
        getAllBalancesQuery.fetchStatus === 'fetching' ? (
          <CircularProgress size={20} />
        ) : null}
      </Typography>

      {getAllBalancesQuery.status === 'loading' ? (
        <Typography mt={2} mb={2}>
          Loading...
        </Typography>
      ) : null}

      {getAllBalancesQuery.status === 'error' ? (
        <Typography mt={2} mb={2}>
          Error:{' '}
          {getAllBalancesQuery.error instanceof Error
            ? getAllBalancesQuery.error.message
            : 'Cannot load balance'}
        </Typography>
      ) : null}

      {getAllBalancesQuery.status === 'success' ? (
        <>
          {getNyksBalanceOnNYKS() ? (
            <pre>
              {getAllBalancesQuery.data.map((item) => (
                <div key={item.denom}>
                  {item.denom}: {item.amount}
                </div>
              ))}
            </pre>
          ) : (
            <Typography mt={2} mb={2}>
              Nyks chain balance is empty. Please deposit some tokens or request some from faucet.
            </Typography>
          )}
        </>
      ) : null}
    </Box>
  );
}

function RegisteredBtcAddressSection({ twilightAddress }: { twilightAddress: string }) {
  const { registeredBtcDepositAddressQuery } = useTwilightRestApi({ twilightAddress });
  return (
    <Box>
      <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
        Registered bitcoin address:
      </Typography>

      {registeredBtcDepositAddressQuery.status === 'loading' ? (
        <Typography mt={2} mb={2}>
          Loading...
        </Typography>
      ) : null}

      {registeredBtcDepositAddressQuery.status === 'error' ? (
        <Typography mt={2} mb={2}>
          {registeredBtcDepositAddressQuery.error instanceof AxiosError &&
          registeredBtcDepositAddressQuery.error.response?.statusText === 'Bad Request'
            ? 'Bitcoin address is not registered. Please register it first.'
            : 'Cannot load registered address'}
        </Typography>
      ) : null}

      {registeredBtcDepositAddressQuery.status === 'success' ? (
        <>
          <pre>{registeredBtcDepositAddressQuery.data.depositAddress}</pre>
          <Typography component="div" mt={2} mb={2}>
            Deposit your desired amount of BTC from registered bitcoin address to any of the reserve
            script address.
          </Typography>
        </>
      ) : null}
    </Box>
  );
}

function BtcDepositProposalSection({ twilightAddress }: { twilightAddress: string }) {
  const { proposalTypeBtcDepositQuery } = useTwilightRestApi({ twilightAddress });
  return (
    <>
      {proposalTypeBtcDepositQuery.data && proposalTypeBtcDepositQuery.data.length > 0 ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: 2 }}>
            MsgConfirmBtcDeposit
          </Typography>

          <BTCDepositProposalTable proposalTypeBtcDepositData={proposalTypeBtcDepositQuery.data} />
        </Box>
      ) : null}
    </>
  );
}

function BTCDepositProposalTable({
  proposalTypeBtcDepositData,
}: {
  proposalTypeBtcDepositData: ProposalTypeBtcDeposit['attestations'];
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
          {proposalTypeBtcDepositData.map((row, index) => (
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

function BtcWithdrawProposalSection({ twilightAddress }: { twilightAddress: string }) {
  const { proposalTypeBtcWithdrawQuery } = useTwilightRestApi({
    twilightAddress,
  });
  return (
    <>
      {proposalTypeBtcWithdrawQuery.data && proposalTypeBtcWithdrawQuery.data.length > 0 ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: 2 }}>
            MsgConfirmBtcWithdraw
          </Typography>

          <BTCWithdrawProposalTable
            proposalTypeBtcWithdrawData={proposalTypeBtcWithdrawQuery.data}
          />
        </Box>
      ) : null}
    </>
  );
}

function BTCWithdrawProposalTable({
  proposalTypeBtcWithdrawData,
}: {
  proposalTypeBtcWithdrawData: ProposalTypeBtcDeposit['attestations'];
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
          {proposalTypeBtcWithdrawData.map((row, index) => (
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
