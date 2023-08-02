'use client';
import { StdSignature } from '@cosmjs/amino';
import { Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { chainId } from '../constants';
import { signArbitraryMessage, useKeplrWallet } from '../hooks/useKeplrWallet';

const QuisquisWallet = () => {
  const { getAccountsQuery, keplrConnected } = useKeplrWallet();
  const twilightAddress = getAccountsQuery.data?.[0].address;

  const [signatureResponse, setsSignatureResponse] = useState<StdSignature>();

  const handleSignArbitraryMessage = async () => {
    const message = 'Message for Keplr signature';
    if (twilightAddress) {
      const signature = await signArbitraryMessage(chainId, twilightAddress, message);
      setsSignatureResponse(signature);
      console.log('Keplr signature', signature);
    }
  };

  const [alicePK, setAlicePK] = useState<string>();
  const [zeroAccount, setZeroAccount] = useState<string>();
  const [updatedPKs, setUpdatedPKs] = useState<string[]>([]);
  const [base58Address, setBase58Address] = useState<string>();
  const [hexAddress, setHexAddress] = useState<string>();

  const generatePK = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    const publicKey = quisquis.generatePublicKeyFromSignatureString(
      signatureResponse?.signature ?? '',
    );
    setAlicePK(publicKey);
  };

  const verifyPK = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    if (alicePK) quisquis.verifyPublicKey(signatureResponse?.signature ?? '', alicePK);
  };

  const generateZeroAccount = async () => {
    if (alicePK) {
      const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
      const account = quisquis.generateZeroAccountFromPublicKey(alicePK);
      setZeroAccount(account);
    }
  };

  const verifyAZeroAccount = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    if (zeroAccount)
      quisquis.verifyAccountWithPublicKey(signatureResponse?.signature ?? '', zeroAccount);
  };

  const verifyAZeroAccountBalance = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    if (zeroAccount)
      quisquis.verifyAccountBalance(signatureResponse?.signature ?? '', zeroAccount, 0);
  };

  const updatePK = async () => {
    if (alicePK) {
      const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
      const updatedPK = quisquis.getUpdatedPublicKey(alicePK);
      setUpdatedPKs((prev) => [...prev, updatedPK]);
    }
  };

  const verifyUpdatedPK = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    if (alicePK) quisquis.verifyUpdatedPublicKey(alicePK, updatedPKs[updatedPKs.length - 1]);
  };

  const handleGetBase58Address = async () => {
    if (alicePK) {
      const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
      const base58 = quisquis.getBase58AddressFromPublicKey(44, alicePK);
      setBase58Address(base58);
    }
  };

  const verifyPKFromBase58Address = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    if (base58Address) quisquis.getPublicKeyFromBase58Address(base58Address);
  };

  const handleGetHexAddress = async () => {
    if (alicePK) {
      const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
      const hex = quisquis.getHexAddressFromPublicKey(44, alicePK);
      setHexAddress(hex);
    }
  };

  const verifyPKFromHexAddress = async () => {
    const quisquis = await import('../quisquis-wasm/quisquis-wallet-sdk');
    if (hexAddress) quisquis.getPublicKeyFromHexAddress(hexAddress);
  };
  return (
    <section>
      {keplrConnected ? (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={handleSignArbitraryMessage}
          >
            Sign message through Keplr
          </Button>

          <br />

          {signatureResponse ? (
            <Typography mt={2} mb={2} component="div">
              <Box component="pre" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(signatureResponse, null, 2)}
              </Box>
            </Typography>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={generatePK}
          >
            Generate public key from signature
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={verifyPK}
          >
            Verify public key
          </Button>

          {alicePK ? (
            <Typography mt={2} mb={2} component="div">
              <Box component="pre" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {alicePK}
              </Box>
            </Typography>
          ) : null}

          <br />
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={generateZeroAccount}
          >
            Generate zero account from public key
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={verifyAZeroAccount}
          >
            Verify zero account with public key
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={verifyAZeroAccountBalance}
          >
            Verify account balance
          </Button>

          {zeroAccount ? (
            <Typography mt={2} mb={2} component="div">
              <Box component="pre" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {zeroAccount}
              </Box>
            </Typography>
          ) : null}
          <br />
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={updatePK}
          >
            Update public key
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={verifyUpdatedPK}
          >
            Verify updated public key
          </Button>

          {updatedPKs ? (
            <Typography mt={2} mb={2} component="div">
              <Box component="pre" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {updatedPKs}
              </Box>
            </Typography>
          ) : null}
          <br />
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={handleGetBase58Address}
          >
            Base 58 address from public key
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={verifyPKFromBase58Address}
          >
            Public key from base 58 address
          </Button>

          {base58Address ? (
            <Typography mt={2} mb={2} component="div">
              <Box component="pre" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {base58Address}
              </Box>
            </Typography>
          ) : null}
          <br />
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={handleGetHexAddress}
          >
            Hex address from public key
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            size="small"
            onClick={verifyPKFromHexAddress}
          >
            Public key from hex address
          </Button>

          {hexAddress ? (
            <Typography mt={2} mb={2} component="div">
              <Box component="pre" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {hexAddress}
              </Box>
            </Typography>
          ) : null}
        </>
      ) : null}
    </section>
  );
};

export default QuisquisWallet;
