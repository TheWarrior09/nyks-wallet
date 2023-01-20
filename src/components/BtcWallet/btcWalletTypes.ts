import { Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
  interface Window extends KeplrWindow {}
}

export interface IBlockstreamUTXO {
  txid: string;
  vout: number;
  status: Status;
  value: number;
}
interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface IBtcFee {
  limits: Limits;
  regular: number;
  priority: number;
}
interface Limits {
  min: number;
  max: number;
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
