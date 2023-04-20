import { Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
  interface Window extends KeplrWindow {}
}

export interface RegisteredReserveAddressesResponse {
  addresses: AddressEntity[] | [];
}
interface AddressEntity {
  reserveScript: string;
  reserveAddress: string;
  judgeAddress: string;
}

export interface RegisteredBtcDepositAddress {
  depositAddress: string;
  twilightDepositAddress: string;
}

export interface ProposalTypeBtcWithdraw extends ProposalTypeBtcDeposit {
  // TODO: Add this type
}

export interface ProposalTypeBtcDeposit {
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
