import { Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
  interface Window extends KeplrWindow {}
}

export interface IReserveScriptAddressResponse {
  scripts: ScriptsEntity[] | [];
}
interface ScriptsEntity {
  reserveScript: string;
  judgeAddress: string;
}

export interface IRegisteredBTCDeopsitAddress {
  depositAddress: string;
  twilightDepositAddress: string;
}

export interface IPROPOSAL_TYPE_BTC_DEPOSIT {
  attestations: AttestationsEntity[] | [];
}
interface AttestationsEntity {
  observed: boolean;
  votes: string[] | [];
  height: string;
  proposal: Proposal;
}
interface Proposal {
  '@type': string;
  depositAddress: string;
  depositAmount: string;
  height: string;
  hash: string;
  twilightDepositAddress: string;
  btcOracleAddress: string;
}
