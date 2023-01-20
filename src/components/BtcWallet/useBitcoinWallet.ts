import type { StdSignature } from '@keplr-wallet/types';
import { BIP32Factory } from 'bip32';
import { entropyToMnemonic, mnemonicToSeedSync } from 'bip39';
import { crypto, payments, Psbt } from 'bitcoinjs-lib';
import { sign, verify } from 'bitcoinjs-message';
import { ECPairFactory } from 'ecpair';
import { useState } from 'react';
import * as ecc from 'tiny-secp256k1';
import { IBlockstreamUTXO } from './btcWalletTypes';
import { btcDerivatePath } from './constants';

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);

function getP2pkhAddress(publicKey: Buffer) {
  return payments.p2pkh({ pubkey: publicKey });
}

interface IuseBitcoinWallet {
  keplrSignature: StdSignature | undefined;
  userMnemonicInput: string;
  transferToAddress: string;
  transferAmount: number;
  feeForTx: number;
  addressUTXOs: IBlockstreamUTXO[] | [];
  totalBalance: number;
}

export const useBitcoinWallet = ({
  keplrSignature,
  userMnemonicInput,
  transferToAddress,
  transferAmount,
  feeForTx,
  addressUTXOs,
  totalBalance,
}: IuseBitcoinWallet) => {
  const [btcAddress, setBtcAddress] = useState<payments.Payment>();
  const [rawTranasctionHex, setRawTranasctionHex] = useState<string>();
  const [userMnemonicGenerated, setUserMnemonicGenerted] = useState('');

  const generateMnemonicfromSignature = () => {
    if (keplrSignature) {
      const hash = crypto.sha256(Buffer.from(keplrSignature.signature));
      // uses HEX strings for entropy
      const entropyHex = hash.toString('hex');
      const mnemonic = entropyToMnemonic(entropyHex);
      setUserMnemonicGenerted(mnemonic);
    }
  };

  const generateBTCAddressFromMnemmnic = () => {
    if (userMnemonicGenerated || userMnemonicInput) {
      const seed = mnemonicToSeedSync(
        userMnemonicGenerated ? userMnemonicGenerated : userMnemonicInput,
      );
      const masterNode = bip32.fromSeed(seed);
      const childNode = masterNode.derivePath(btcDerivatePath);
      const btcP2pkhAddress = getP2pkhAddress(childNode.publicKey);
      setBtcAddress(btcP2pkhAddress);
    }
  };

  const generateBTCSignatureFromMsg = () => {
    if (userMnemonicGenerated || userMnemonicInput) {
      const seed = mnemonicToSeedSync(
        userMnemonicGenerated ? userMnemonicGenerated : userMnemonicInput,
      );
      const masterNode = bip32.fromSeed(seed);
      const childNode = masterNode.derivePath(btcDerivatePath);
      const btcP2pkhAddress = getP2pkhAddress(childNode.publicKey);

      if (childNode.privateKey && btcP2pkhAddress.address) {
        const msg = 'Hello';
        const msgHash = Buffer.from(msg);

        const signature = sign(msg, childNode.privateKey, true);

        const isMessageVerify = verify(msg, btcP2pkhAddress.address, signature);

        const signature1 = childNode.sign(crypto.sha256(msgHash));

        const isMessage1Verify = childNode.verify(crypto.sha256(msgHash), signature1);

        return { isMessageVerify, isMessage1Verify };
      }
    }
  };

  const createTransaction = async () => {
    if (userMnemonicGenerated) {
      const seed = mnemonicToSeedSync(userMnemonicGenerated);
      const masterNode = bip32.fromSeed(seed);
      const childNode = masterNode.derivePath(btcDerivatePath);
      const keyPair = ECPair.fromPrivateKey(childNode.privateKey!);
      const btcP2pkhAddress = getP2pkhAddress(childNode.publicKey);

      //   if (!validateBTCAddress(transferToAddress)) {
      //     throw new Error('Invalid BTC Address');
      //   }

      let inputCount = 0;
      let outputCount = 0;
      let change = 0;
      let transactionSize = 0;
      let fee = 0;

      const P2PKH_IN_SIZE = 148;
      const P2PKH_OUT_SIZE = 34;

      const psbt = new Psbt();

      for (const utxo of addressUTXOs) {
        const txHEX = await (
          await fetch(`https://blockstream.info/api/tx/${utxo.txid}/hex`)
        ).text();

        inputCount += 1;

        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          nonWitnessUtxo: Buffer.from(txHEX, 'hex'),
        });
      }

      if (totalBalance - transferAmount === 0) {
        outputCount = 1;

        transactionSize = inputCount * P2PKH_IN_SIZE + outputCount * P2PKH_OUT_SIZE + 10;
        fee = transactionSize * feeForTx;

        if (totalBalance - fee < 0) {
          throw new Error('Balance is too low for this transaction');
        }

        const vauleTransferValue = totalBalance - fee;
        psbt.addOutput({
          address: transferToAddress,
          value: vauleTransferValue,
        });
      } else if (totalBalance - transferAmount > 0) {
        outputCount = 2;

        transactionSize = inputCount * P2PKH_IN_SIZE + outputCount * P2PKH_OUT_SIZE + 10;
        fee = transactionSize * feeForTx;

        if (totalBalance - fee < 0) {
          throw new Error('Balance is too low for this transaction');
        }

        change = totalBalance - transferAmount - fee;
        const vauleTransferValue = totalBalance - change - fee;
        psbt.addOutput({
          address: transferToAddress,
          value: vauleTransferValue,
        });
        psbt.addOutput({ address: btcP2pkhAddress.address!, value: change });
      }

      psbt.signAllInputs(keyPair);
      psbt.finalizeAllInputs();
      const txHash = psbt.extractTransaction().toHex();
      setRawTranasctionHex(txHash);
    }
  };

  return {
    generateMnemonicfromSignature,
    userMnemonicGenerated,
    generateBTCAddressFromMnemmnic,
    btcAddress,
    createTransaction,
    rawTranasctionHex,
  };
};
