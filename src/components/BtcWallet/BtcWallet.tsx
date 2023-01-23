import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useKeplrWallet } from './useKeplrWallet';
import { useBitcoinWallet } from './useBitcoinWallet';
import { useTwilightRestApi } from './useTwilightRestApi';
import { useThirdPartyApi } from './useThirdPartyApi';
import { useTwilightRpcWithCosmjs } from './useTwilightRpcWithCosmjs';
import { useValidateUserInputs } from './useValidateUserInputs';
import { coinDenom, msgForSignature } from './constants';

export default function BtcWallet() {
  const [hasAccount, setHasAccount] = useState(false);
  const [userMnemonicInput, setUserMnemonicInput] = useState('');
  const [transferToAddress, setTransferToAddress] = useState('');
  const [transferToAmount, setTransferToAmount] = useState(0);
  const [feeForTx, setFeeForTx] = useState(1);

  const { connectKeplr, signMessage, keplrSignature, accountBalanceInfo, accountInfo } =
    useKeplrWallet();

  const {
    btcCurrentFee,
    getFeeEstimates,
    broadcastTranasction,
    txID,
    getAddressUTXOs,
    addressUTXOs,
    totalBalance,
  } = useThirdPartyApi();

  const {
    generateMnemonicfromSignature,
    userMnemonicGenerated,
    generateBTCAddressFromMnemmnic,
    btcAddress,
    createTransaction,
    rawTranasctionHex,
  } = useBitcoinWallet({
    keplrSignature,
    transferToAddress,
    feeForTx,
    userMnemonicInput,
    transferAmount: transferToAmount,
    totalBalance,
    addressUTXOs,
  });

  const {
    checkBTCAddressValidity,
    userAddressInputState,
    userMnemonicInputState,
    validateUserMnemonic,
  } = useValidateUserInputs({
    transferToAddress,
    userMnemonicInput,
  });

  const { getBTCReserveAddress, reserveScriptAddresses, registeredBTCDepositAddress } =
    useTwilightRestApi({ twilightAddress: accountInfo?.address });

  const { registerBtcAddressOnNyks, txIdNYKS, isDepositAddressRegistered } =
    useTwilightRpcWithCosmjs({
      btcAddress: btcAddress?.address,
      twilightAddress: accountInfo?.address,
    });

  const handleGetBtcAddressUTXOs = () => getAddressUTXOs(btcAddress?.address);

  const handleBroadcastTranasction = () => broadcastTranasction(rawTranasctionHex);

  const handleAlreadyBtcAddressCreated = (event: React.ChangeEvent<HTMLInputElement>) =>
    setHasAccount(event.target.checked);

  const handleUserMnemonicChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserMnemonicInput(event.target.value);

  const handleTransferToAddressChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTransferToAddress(event.target.value);

  const handleTransferToAmountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTransferToAmount(event.target.valueAsNumber);

  const handleFeeForTxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFeeForTx(event.target.valueAsNumber);

  const renderContentBasedOnAddressRegistered = () => {
    if (registeredBTCDepositAddress && btcAddress) {
      if (
        registeredBTCDepositAddress.depositAddress === btcAddress.address ||
        isDepositAddressRegistered
      ) {
        return (
          <FormControlLabel
            control={<Checkbox checked color="success" />}
            label="This Bitcoin address is registered on the NYKS blockchain"
          />
        );
      } else {
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            onClick={registerBtcAddressOnNyks}
          >
            Register BTC address on NYKS
          </Button>
        );
      }
    } else {
      return null;
    }
  };

  const newUser = (
    <>
      <Box>
        <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={signMessage}>
          Sign message
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={generateMnemonicfromSignature}
        >
          Generate mnemonic
        </Button>
      </Box>
    </>
  );

  const oldUser = (
    <>
      <FormGroup sx={{ mt: 2, mb: 2 }}>
        <TextField
          label="Mnemonic phrase"
          multiline
          variant="outlined"
          rows={3}
          placeholder="Please enter a valid mnemonic phrase"
          value={userMnemonicInput}
          onChange={handleUserMnemonicChange}
          required
          onBlur={validateUserMnemonic}
          error={typeof userMnemonicInputState === 'undefined' ? false : !userMnemonicInputState}
        />
      </FormGroup>
    </>
  );

  const walletInputs = (
    <>
      <Box>
        <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={connectKeplr}>
          Connect Keplr wallet
        </Button>
      </Box>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={hasAccount} onChange={handleAlreadyBtcAddressCreated} />}
          label="Already have an account"
        />
      </FormGroup>

      {!hasAccount ? newUser : oldUser}

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2, mr: 3 }}
          onClick={generateBTCAddressFromMnemmnic}
        >
          Generate bitcoin address
        </Button>

        {renderContentBasedOnAddressRegistered()}
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleGetBtcAddressUTXOs}
        >
          Get address UTXO
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={getBTCReserveAddress}
        >
          Get reserve script address
        </Button>
      </Box>

      <Box>
        <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={getFeeEstimates}>
          Get estimated fee
        </Button>
      </Box>

      <Box>
        <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={1}>
          Create transaction
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="To address"
            variant="outlined"
            type="text"
            onChange={handleTransferToAddressChange}
            value={transferToAddress}
            onBlur={checkBTCAddressValidity}
            error={typeof userAddressInputState === 'undefined' ? false : !userAddressInputState}
            sx={{ width: '450px', m: 1 }}
          />
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            onChange={handleTransferToAmountChange}
            value={transferToAmount}
            sx={{ m: 1 }}
          />
          <TextField
            id="outlined-basic"
            label="Fee rate"
            variant="outlined"
            type="number"
            onChange={handleFeeForTxChange}
            value={feeForTx}
            sx={{ m: 1 }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={createTransaction}
        >
          Sign transaction
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleBroadcastTranasction}
        >
          Broadcast transaction
        </Button>
      </Box>
    </>
  );

  const walletResult = (
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

      {accountInfo && accountBalanceInfo ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Signature message:
          </Typography>
          <pre>{msgForSignature}</pre>
        </Box>
      ) : null}

      {keplrSignature ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Keplr signature:
          </Typography>
          <pre
            style={{
              maxWidth: 600,
              whiteSpace: 'pre-wrap',
              lineBreak: 'anywhere',
            }}
          >
            {keplrSignature.signature}
          </pre>
        </Box>
      ) : null}

      {userMnemonicGenerated ? (
        <Box mt={2} mb={2}>
          <FormGroup>
            <TextField
              label="Mnemonic phrase"
              multiline
              variant="outlined"
              rows={3}
              value={userMnemonicGenerated}
            />
          </FormGroup>{' '}
        </Box>
      ) : null}

      {btcAddress ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin P2PKH address:
          </Typography>
          <pre>{btcAddress.address}</pre>{' '}
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

      {totalBalance ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin balance:
          </Typography>
          <pre>{totalBalance} sat</pre>{' '}
        </Box>
      ) : null}

      {reserveScriptAddresses ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Reserve script addresses:
          </Typography>
          <pre>{JSON.stringify(reserveScriptAddresses.scripts, null, 2)}</pre>
        </Box>
      ) : null}

      {btcCurrentFee ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin current estimated fee:
          </Typography>
          <pre>Fee: {JSON.stringify(btcCurrentFee, null, 2)}</pre>{' '}
        </Box>
      ) : null}

      {rawTranasctionHex ? (
        <Box>
          <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
            Bitcoin raw transaction hex:
          </Typography>
          <pre
            style={{
              maxWidth: 600,
              whiteSpace: 'pre-wrap',
              lineBreak: 'anywhere',
            }}
          >
            {rawTranasctionHex}
          </pre>
        </Box>
      ) : null}

      <Box mb={2}>
        {txID ? (
          <Box>
            <Typography variant="h6" component="div" color="text.secondary" mt={2} mb={2}>
              Bitcoin transaction Id:
            </Typography>

            <Link
              href={`https://live.blockcypher.com/btc/tx/${txID}`}
              target="_blank"
              rel="noreferrer"
            >
              {txID}
            </Link>
          </Box>
        ) : null}
      </Box>
    </>
  );

  return (
    <Container maxWidth="xl" component="section">
      <Typography variant="h4" component="h1" color="text.secondary" mt={2} mb={2}>
        Bitcoin web wallet
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={6} md={6}>
          {walletInputs}
        </Grid>
        <Grid item xs={6} md={6}>
          {walletResult}
        </Grid>
      </Grid>
    </Container>
  );
}
