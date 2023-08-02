import {
  base58AddressFromPublicKey,
  createQuisQuisTransaction,
  generatePublicKeyFromSignature,
  generateZeroAccount,
  getTestnetCoins,
  hexAddressFromPublicKey,
  publicKeyFromHexAddress,
  publicKeyFrombase58Address,
  updatePublicKey,
  verifyAccount,
  verifyKeyPair,
  verifyKeyPairAccount,
  verifyUpdatePublicKey,
  createTx,
  verifyQuisQuisTransaction,
  createDarkTx,
} from 'quisquis-wasm';
import { Buffer } from 'buffer';

function hexStringToUint8Array1(hexString: string) {
  if (hexString.length % 2 !== 0) {
    console.error('Invalid hexadecimal string');
    return null;
  }

  const arrayBuffer = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    const byteValue = parseInt(hexString.substr(i, 2), 16);
    if (isNaN(byteValue)) {
      console.error('Invalid byte found at position: ' + i);
      return null;
    }
    arrayBuffer[i / 2] = byteValue;
  }

  return arrayBuffer;
}

function convertHEXtoBytesArray(signature: string): Uint8Array | null {
  // Remove the "0x" prefix if it exists
  if (signature.startsWith('0x')) {
    signature = signature.slice(2);
  }

  // Validate that the remaining string is a valid hexadecimal string
  if (!/^[0-9a-fA-F]*$/.test(signature)) {
    console.error('Input is not a valid hexadecimal string');
    return null;
  }

  const bytes = new Uint8Array(signature.length / 2);
  for (let i = 0; i < signature.length; i += 2) {
    const byte = parseInt(signature.substr(i, 2), 16);
    if (isNaN(byte)) {
      console.error('Failed to parse byte at position', i / 2);
      return null;
    }
    bytes[i / 2] = byte;
  }
  return bytes;
}

function hexStringToUint8Array(hexString: string) {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2);
  }

  // if (!/^[0-9a-fA-F]*$/.test(hexString)) {
  //   throw new Error('Input is not a valid hexadecimal string');
  // }

  if (typeof TextEncoder !== 'undefined') {
    const encoder = new TextEncoder();
    return encoder.encode(hexString);
  } else if (typeof Buffer !== 'undefined') {
    const buffer = Buffer.from(hexString);
    return new Uint8Array(buffer.buffer);
  } else {
    throw new Error('No encoding method available.');
  }
}

function uint8ArrayToBase64String(uint8Array: Uint8Array) {
  if (typeof btoa !== 'undefined') {
    const binaryString = String.fromCharCode(...uint8Array);
    return btoa(binaryString);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(uint8Array).toString('base64');
  } else {
    throw new Error('No base64 conversion method available.');
  }
}

function generatePublicKeyFromSignatureString(signature: string): string {
  const signatureArray = hexStringToUint8Array(signature);
  try {
    const publicKeyString = generatePublicKeyFromSignature(signatureArray);
    console.log('Public key from signature: ', publicKeyString);
    return publicKeyString;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verifyPublicKey(signature: string, publicKey: string) {
  const signatureArray = hexStringToUint8Array(signature);
  try {
    const isVerifiedPK = verifyKeyPair(signatureArray, publicKey);
    console.log('Public key verification: ', isVerifiedPK);
    return isVerifiedPK;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function generateZeroAccountFromPublicKey(publicKey: string): string {
  try {
    const zeroAccountGenerated = generateZeroAccount(publicKey);
    console.log('Zero account from public key: ', zeroAccountGenerated);
    return zeroAccountGenerated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verifyAccountWithPublicKey(signature: string, account: string) {
  const signatureArray = hexStringToUint8Array(signature);
  try {
    const isVerifiedAccount = verifyKeyPairAccount(signatureArray, account);
    console.log('Account public key verification: ', isVerifiedAccount);
    return isVerifiedAccount;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verifyAccountBalance(signature: string, account: string, balance: number) {
  const signatureArray = hexStringToUint8Array(signature);
  try {
    const isVerifiedAccountBalance = verifyAccount(signatureArray, account, balance);
    console.log('Account balance commitment is equal to balance: ', isVerifiedAccountBalance);
    return isVerifiedAccountBalance;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getUpdatedPublicKey(publicKey: string) {
  try {
    const newPublicKey = updatePublicKey(publicKey);
    console.log('Updated public key is: ', newPublicKey);
    return newPublicKey;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verifyUpdatedPublicKey(publicKey: string, updatedPublicKey: string) {
  try {
    const isUpdatedPKVerified = verifyUpdatePublicKey(publicKey, updatedPublicKey);
    console.log('Updated public key is correct: ', isUpdatedPKVerified);
    return isUpdatedPKVerified;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getBase58AddressFromPublicKey(network: number, publicKey: string) {
  try {
    const base58Address = base58AddressFromPublicKey(network, publicKey);
    console.log('Base 58 address from public key: ', base58Address);
    return base58Address;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getPublicKeyFromBase58Address(base58Address: string) {
  try {
    const derivedPK = publicKeyFrombase58Address(base58Address);
    console.log('Public key derived from base 58 address: ', derivedPK);
    return derivedPK;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getHexAddressFromPublicKey(network: number, publicKey: string) {
  try {
    const hexAddress = hexAddressFromPublicKey(network, publicKey);
    console.log('Hex address from public key: ', hexAddress);
    return hexAddress;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getPublicKeyFromHexAddress(hexAddress: string) {
  try {
    const derivedPK = publicKeyFromHexAddress(hexAddress);
    console.log('Public key derived from hex address: ', derivedPK);
    return derivedPK;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function get10TestnetCoins(ZeroAccount: string) {
  try {
    const accountWith10Btc = getTestnetCoins(ZeroAccount);
    console.log('Account with 10 coins: ', accountWith10Btc);
    return accountWith10Btc;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function createQuisquisTransaction(
  signature: string,
  accountWithBalance: string,
  publicKey: string,
) {
  const signatureArray = hexStringToUint8Array(signature);
  console.log(signatureArray);
  const base64Signature = uint8ArrayToBase64String(signatureArray);
  const transactionVector = [
    {
      total_amount: -5,
      account: accountWithBalance,
      receivers: [
        {
          amount: 5,
          public_key: publicKey,
        },
      ],
    },
  ];
  const senderBalanceVector = [5];
  try {
    const txResponse = createQuisQuisTransaction(
      convertToJsonString(transactionVector),
      convertToJsonString(senderBalanceVector),
      convertToJsonString([base64Signature]),
    );
    console.log('Quisquis transaction response: ', txResponse);
    return txResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type Transaction = {
  total_amount: number;
  account: string;
  receivers: Receiver[];
};

type Receiver = {
  amount: number;
  acc: string;
};

function createZkOSTransaction({
  transactionArray,
  senderBalanceArray,
  receiverBalanceArray,
  signatures,
}: {
  transactionArray: Transaction[];
  senderBalanceArray: number[];
  receiverBalanceArray: number[];
  signatures: string[];
}): string {
  const base64SignatureArray = signatures.map((signature) => signatureToBase64(signature));
  // const signatureArray = hexStringToUint8Array(signature);
  // const base64Signature = uint8ArrayToBase64String(signatureArray);

  // const transactionVector: Transaction[] = [
  //   {
  //     total_amount: -5,
  //     account: accountWithBalance,
  //     receivers: [
  //       {
  //         amount: 5,
  //         acc: generateZeroAccount(receiverPublicKey),
  //       },
  //     ],
  //   },
  // ];
  // const senderBalanceVector = [3];
  console.log('convertToJsonString(transactionArray):', convertToJsonString(transactionArray));

  console.log('convertToJsonString(senderBalanceArray):', convertToJsonString(senderBalanceArray));

  console.log(
    'convertToJsonString(receiverBalanceArray): ',
    convertToJsonString(receiverBalanceArray),
  );

  try {
    const txResponse = createDarkTx(
      convertToJsonString(transactionArray),
      convertToJsonString(senderBalanceArray),
      convertToJsonString(base64SignatureArray),
      convertToJsonString(senderBalanceArray),
      convertToJsonString(receiverBalanceArray),
    );
    console.log('ZkOS Transaction response: ', txResponse);
    return txResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verifyZkOSTransaction(zkOSTransaction: string): string {
  return verifyQuisQuisTransaction(zkOSTransaction);
}

const convertToJsonString = (jsObject: any) => {
  return JSON.stringify(jsObject);
};

const signatureToBase64 = (signature: string) => {
  //TODO implement this function to sign a message with private key and then encode it in base6
  const signatureArray = hexStringToUint8Array(signature);
  const base64Signature = uint8ArrayToBase64String(signatureArray);
  return base64Signature;
};

export {
  generatePublicKeyFromSignatureString,
  verifyPublicKey,
  generateZeroAccountFromPublicKey,
  verifyAccountWithPublicKey,
  verifyAccountBalance,
  getUpdatedPublicKey,
  verifyUpdatedPublicKey,
  getBase58AddressFromPublicKey,
  getPublicKeyFromBase58Address,
  getHexAddressFromPublicKey,
  getPublicKeyFromHexAddress,
  get10TestnetCoins,
  createQuisquisTransaction,
  createZkOSTransaction,
  verifyZkOSTransaction,
};
