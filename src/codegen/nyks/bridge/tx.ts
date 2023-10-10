import { Long, isSet, DeepPartial } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
export interface MsgConfirmBtcDeposit {
  reserveAddress: string;
  depositAmount: Long;
  height: Long;
  hash: string;
  twilightDepositAddress: string;
  oracleAddress: string;
}
export interface MsgConfirmBtcDepositSDKType {
  reserveAddress: string;
  depositAmount: Long;
  height: Long;
  hash: string;
  twilightDepositAddress: string;
  oracleAddress: string;
}
export interface MsgConfirmBtcDepositResponse {
  twilightDepositAddress: string;
}
export interface MsgConfirmBtcDepositResponseSDKType {
  twilightDepositAddress: string;
}
export interface MsgRegisterBtcDepositAddress {
  btcDepositAddress: string;
  btcSatoshiTestAmount: Long;
  twilightStakingAmount: Long;
  twilightAddress: string;
}
export interface MsgRegisterBtcDepositAddressSDKType {
  btcDepositAddress: string;
  btcSatoshiTestAmount: Long;
  twilightStakingAmount: Long;
  twilightAddress: string;
}
export interface MsgRegisterBtcDepositAddressResponse {}
export interface MsgRegisterBtcDepositAddressResponseSDKType {}
export interface MsgRegisterReserveAddress {
  reserveScript: string;
  reserveAddress: string;
  judgeAddress: string;
}
export interface MsgRegisterReserveAddressSDKType {
  reserveScript: string;
  reserveAddress: string;
  judgeAddress: string;
}
export interface MsgRegisterReserveAddressResponse {
  reserveId: string;
  reserveAddress: string;
}
export interface MsgRegisterReserveAddressResponseSDKType {
  reserveId: string;
  reserveAddress: string;
}
export interface MsgRegisterJudge {
  creator: string;
  judgeAddress: string;
  validatorAddress: string;
}
export interface MsgRegisterJudgeSDKType {
  creator: string;
  judgeAddress: string;
  validatorAddress: string;
}
export interface MsgRegisterJudgeResponse {}
export interface MsgRegisterJudgeResponseSDKType {}
/** this line is used by starport scaffolding # proto/tx/message */

export interface MsgWithdrawBtcRequest {
  withdrawAddress: string;
  reserveAddress: string;
  withdrawAmount: Long;
  twilightAddress: string;
}
/** this line is used by starport scaffolding # proto/tx/message */

export interface MsgWithdrawBtcRequestSDKType {
  withdrawAddress: string;
  reserveAddress: string;
  withdrawAmount: Long;
  twilightAddress: string;
}
export interface MsgWithdrawBtcRequestResponse {}
export interface MsgWithdrawBtcRequestResponseSDKType {}
export interface MsgWithdrawTxSigned {
  creator: string;
  validatorAddress: string;
  btcTxSigned: string;
}
export interface MsgWithdrawTxSignedSDKType {
  creator: string;
  validatorAddress: string;
  btcTxSigned: string;
}
export interface MsgWithdrawTxSignedResponse {}
export interface MsgWithdrawTxSignedResponseSDKType {}
export interface MsgWithdrawTxFinal {
  creator: string;
  judgeAddress: string;
  btcTx: string;
}
export interface MsgWithdrawTxFinalSDKType {
  creator: string;
  judgeAddress: string;
  btcTx: string;
}
export interface MsgWithdrawTxFinalResponse {}
export interface MsgWithdrawTxFinalResponseSDKType {}
export interface MsgProposeRefundHash {
  refundHash: string;
  judgeAddress: string;
}
export interface MsgProposeRefundHashSDKType {
  refundHash: string;
  judgeAddress: string;
}
export interface MsgProposeRefundHashResponse {}
export interface MsgProposeRefundHashResponseSDKType {}
export interface MsgConfirmBtcWithdraw {
  txHash: string;
  height: Long;
  hash: string;
  judgeAddress: string;
}
export interface MsgConfirmBtcWithdrawSDKType {
  txHash: string;
  height: Long;
  hash: string;
  judgeAddress: string;
}
export interface MsgConfirmBtcWithdrawResponse {}
export interface MsgConfirmBtcWithdrawResponseSDKType {}
/**
 * Sweep messages in order
 * 1. MsgProposeSweepAddress
 */

export interface MsgProposeSweepAddress {
  btcAddress: string;
  btcScript: string;
  reserveId: Long;
  roundId: Long;
  judgeAddress: string;
}
/**
 * Sweep messages in order
 * 1. MsgProposeSweepAddress
 */

export interface MsgProposeSweepAddressSDKType {
  btcAddress: string;
  btcScript: string;
  reserveId: Long;
  roundId: Long;
  judgeAddress: string;
}
export interface MsgProposeSweepAddressResponse {}
export interface MsgProposeSweepAddressResponseSDKType {}
/** 2. MsgUnsignedTxSweep */

export interface MsgUnsignedTxSweep {
  txId: string;
  btcUnsignedSweepTx: string;
  reserveId: Long;
  roundId: Long;
  judgeAddress: string;
}
/** 2. MsgUnsignedTxSweep */

export interface MsgUnsignedTxSweepSDKType {
  txId: string;
  btcUnsignedSweepTx: string;
  reserveId: Long;
  roundId: Long;
  judgeAddress: string;
}
export interface MsgUnsignedTxSweepResponse {}
export interface MsgUnsignedTxSweepResponseSDKType {}
/** 3. MsgUnsignedTxRefund */

export interface MsgUnsignedTxRefund {
  reserveId: Long;
  roundId: Long;
  btcUnsignedRefundTx: string;
  judgeAddress: string;
}
/** 3. MsgUnsignedTxRefund */

export interface MsgUnsignedTxRefundSDKType {
  reserveId: Long;
  roundId: Long;
  btcUnsignedRefundTx: string;
  judgeAddress: string;
}
export interface MsgUnsignedTxRefundResponse {}
export interface MsgUnsignedTxRefundResponseSDKType {}
/** 4. MsgSignRefund */

export interface MsgSignRefund {
  reserveId: Long;
  roundId: Long;
  signerPublicKey: string;
  refundSignature: string;
  btcOracleAddress: string;
}
/** 4. MsgSignRefund */

export interface MsgSignRefundSDKType {
  reserveId: Long;
  roundId: Long;
  signerPublicKey: string;
  refundSignature: string;
  btcOracleAddress: string;
}
export interface MsgSignRefundResponse {}
export interface MsgSignRefundResponseSDKType {}
/** 5. MsgSignSweep */

export interface MsgSignSweep {
  reserveId: Long;
  roundId: Long;
  signerPublicKey: string;
  sweepSignature: string[];
  btcOracleAddress: string;
}
/** 5. MsgSignSweep */

export interface MsgSignSweepSDKType {
  reserveId: Long;
  roundId: Long;
  signerPublicKey: string;
  sweepSignature: string[];
  btcOracleAddress: string;
}
export interface MsgSignSweepResponse {}
export interface MsgSignSweepResponseSDKType {}
/** 6. MsgBroadcastTxRefund */

export interface MsgBroadcastTxRefund {
  reserveId: Long;
  roundId: Long;
  signedRefundTx: string;
  judgeAddress: string;
}
/** 6. MsgBroadcastTxRefund */

export interface MsgBroadcastTxRefundSDKType {
  reserveId: Long;
  roundId: Long;
  signedRefundTx: string;
  judgeAddress: string;
}
export interface MsgBroadcastTxRefundResponse {}
export interface MsgBroadcastTxRefundResponseSDKType {}
/** 7. MsgBroadcastTxSweep */

export interface MsgBroadcastTxSweep {
  reserveId: Long;
  roundId: Long;
  signedSweepTx: string;
  judgeAddress: string;
}
/** 7. MsgBroadcastTxSweep */

export interface MsgBroadcastTxSweepSDKType {
  reserveId: Long;
  roundId: Long;
  signedSweepTx: string;
  judgeAddress: string;
}
export interface MsgBroadcastTxSweepResponse {}
export interface MsgBroadcastTxSweepResponseSDKType {}
/** 8. MsgSweepProposal */

export interface MsgSweepProposal {
  reserveId: Long;
  newReserveAddress: string;
  judgeAddress: string;
  BtcBlockNumber: Long;
  btcRelayCapacityValue: Long;
  btcTxHash: string;
  UnlockHeight: Long;
  roundId: Long;
  withdrawIdentifiers: string[];
}
/** 8. MsgSweepProposal */

export interface MsgSweepProposalSDKType {
  reserveId: Long;
  newReserveAddress: string;
  judgeAddress: string;
  BtcBlockNumber: Long;
  btcRelayCapacityValue: Long;
  btcTxHash: string;
  UnlockHeight: Long;
  roundId: Long;
  withdrawIdentifiers: string[];
}
export interface MsgSweepProposalResponse {}
export interface MsgSweepProposalResponseSDKType {}

function createBaseMsgConfirmBtcDeposit(): MsgConfirmBtcDeposit {
  return {
    reserveAddress: "",
    depositAmount: Long.UZERO,
    height: Long.UZERO,
    hash: "",
    twilightDepositAddress: "",
    oracleAddress: ""
  };
}

export const MsgConfirmBtcDeposit = {
  encode(message: MsgConfirmBtcDeposit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveAddress !== "") {
      writer.uint32(10).string(message.reserveAddress);
    }

    if (!message.depositAmount.isZero()) {
      writer.uint32(16).uint64(message.depositAmount);
    }

    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }

    if (message.hash !== "") {
      writer.uint32(34).string(message.hash);
    }

    if (message.twilightDepositAddress !== "") {
      writer.uint32(42).string(message.twilightDepositAddress);
    }

    if (message.oracleAddress !== "") {
      writer.uint32(58).string(message.oracleAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcDeposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcDeposit();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveAddress = reader.string();
          break;

        case 2:
          message.depositAmount = (reader.uint64() as Long);
          break;

        case 3:
          message.height = (reader.uint64() as Long);
          break;

        case 4:
          message.hash = reader.string();
          break;

        case 5:
          message.twilightDepositAddress = reader.string();
          break;

        case 7:
          message.oracleAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgConfirmBtcDeposit {
    return {
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      depositAmount: isSet(object.depositAmount) ? Long.fromValue(object.depositAmount) : Long.UZERO,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      hash: isSet(object.hash) ? String(object.hash) : "",
      twilightDepositAddress: isSet(object.twilightDepositAddress) ? String(object.twilightDepositAddress) : "",
      oracleAddress: isSet(object.oracleAddress) ? String(object.oracleAddress) : ""
    };
  },

  toJSON(message: MsgConfirmBtcDeposit): unknown {
    const obj: any = {};
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.depositAmount !== undefined && (obj.depositAmount = (message.depositAmount || Long.UZERO).toString());
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.hash !== undefined && (obj.hash = message.hash);
    message.twilightDepositAddress !== undefined && (obj.twilightDepositAddress = message.twilightDepositAddress);
    message.oracleAddress !== undefined && (obj.oracleAddress = message.oracleAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgConfirmBtcDeposit>): MsgConfirmBtcDeposit {
    const message = createBaseMsgConfirmBtcDeposit();
    message.reserveAddress = object.reserveAddress ?? "";
    message.depositAmount = object.depositAmount !== undefined && object.depositAmount !== null ? Long.fromValue(object.depositAmount) : Long.UZERO;
    message.height = object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.UZERO;
    message.hash = object.hash ?? "";
    message.twilightDepositAddress = object.twilightDepositAddress ?? "";
    message.oracleAddress = object.oracleAddress ?? "";
    return message;
  }

};

function createBaseMsgConfirmBtcDepositResponse(): MsgConfirmBtcDepositResponse {
  return {
    twilightDepositAddress: ""
  };
}

export const MsgConfirmBtcDepositResponse = {
  encode(message: MsgConfirmBtcDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.twilightDepositAddress !== "") {
      writer.uint32(10).string(message.twilightDepositAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcDepositResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.twilightDepositAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgConfirmBtcDepositResponse {
    return {
      twilightDepositAddress: isSet(object.twilightDepositAddress) ? String(object.twilightDepositAddress) : ""
    };
  },

  toJSON(message: MsgConfirmBtcDepositResponse): unknown {
    const obj: any = {};
    message.twilightDepositAddress !== undefined && (obj.twilightDepositAddress = message.twilightDepositAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgConfirmBtcDepositResponse>): MsgConfirmBtcDepositResponse {
    const message = createBaseMsgConfirmBtcDepositResponse();
    message.twilightDepositAddress = object.twilightDepositAddress ?? "";
    return message;
  }

};

function createBaseMsgRegisterBtcDepositAddress(): MsgRegisterBtcDepositAddress {
  return {
    btcDepositAddress: "",
    btcSatoshiTestAmount: Long.UZERO,
    twilightStakingAmount: Long.UZERO,
    twilightAddress: ""
  };
}

export const MsgRegisterBtcDepositAddress = {
  encode(message: MsgRegisterBtcDepositAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.btcDepositAddress !== "") {
      writer.uint32(10).string(message.btcDepositAddress);
    }

    if (!message.btcSatoshiTestAmount.isZero()) {
      writer.uint32(16).uint64(message.btcSatoshiTestAmount);
    }

    if (!message.twilightStakingAmount.isZero()) {
      writer.uint32(24).uint64(message.twilightStakingAmount);
    }

    if (message.twilightAddress !== "") {
      writer.uint32(34).string(message.twilightAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterBtcDepositAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterBtcDepositAddress();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.btcDepositAddress = reader.string();
          break;

        case 2:
          message.btcSatoshiTestAmount = (reader.uint64() as Long);
          break;

        case 3:
          message.twilightStakingAmount = (reader.uint64() as Long);
          break;

        case 4:
          message.twilightAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgRegisterBtcDepositAddress {
    return {
      btcDepositAddress: isSet(object.btcDepositAddress) ? String(object.btcDepositAddress) : "",
      btcSatoshiTestAmount: isSet(object.btcSatoshiTestAmount) ? Long.fromValue(object.btcSatoshiTestAmount) : Long.UZERO,
      twilightStakingAmount: isSet(object.twilightStakingAmount) ? Long.fromValue(object.twilightStakingAmount) : Long.UZERO,
      twilightAddress: isSet(object.twilightAddress) ? String(object.twilightAddress) : ""
    };
  },

  toJSON(message: MsgRegisterBtcDepositAddress): unknown {
    const obj: any = {};
    message.btcDepositAddress !== undefined && (obj.btcDepositAddress = message.btcDepositAddress);
    message.btcSatoshiTestAmount !== undefined && (obj.btcSatoshiTestAmount = (message.btcSatoshiTestAmount || Long.UZERO).toString());
    message.twilightStakingAmount !== undefined && (obj.twilightStakingAmount = (message.twilightStakingAmount || Long.UZERO).toString());
    message.twilightAddress !== undefined && (obj.twilightAddress = message.twilightAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRegisterBtcDepositAddress>): MsgRegisterBtcDepositAddress {
    const message = createBaseMsgRegisterBtcDepositAddress();
    message.btcDepositAddress = object.btcDepositAddress ?? "";
    message.btcSatoshiTestAmount = object.btcSatoshiTestAmount !== undefined && object.btcSatoshiTestAmount !== null ? Long.fromValue(object.btcSatoshiTestAmount) : Long.UZERO;
    message.twilightStakingAmount = object.twilightStakingAmount !== undefined && object.twilightStakingAmount !== null ? Long.fromValue(object.twilightStakingAmount) : Long.UZERO;
    message.twilightAddress = object.twilightAddress ?? "";
    return message;
  }

};

function createBaseMsgRegisterBtcDepositAddressResponse(): MsgRegisterBtcDepositAddressResponse {
  return {};
}

export const MsgRegisterBtcDepositAddressResponse = {
  encode(_: MsgRegisterBtcDepositAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterBtcDepositAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterBtcDepositAddressResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgRegisterBtcDepositAddressResponse {
    return {};
  },

  toJSON(_: MsgRegisterBtcDepositAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgRegisterBtcDepositAddressResponse>): MsgRegisterBtcDepositAddressResponse {
    const message = createBaseMsgRegisterBtcDepositAddressResponse();
    return message;
  }

};

function createBaseMsgRegisterReserveAddress(): MsgRegisterReserveAddress {
  return {
    reserveScript: "",
    reserveAddress: "",
    judgeAddress: ""
  };
}

export const MsgRegisterReserveAddress = {
  encode(message: MsgRegisterReserveAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveScript !== "") {
      writer.uint32(10).string(message.reserveScript);
    }

    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(26).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterReserveAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterReserveAddress();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveScript = reader.string();
          break;

        case 2:
          message.reserveAddress = reader.string();
          break;

        case 3:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgRegisterReserveAddress {
    return {
      reserveScript: isSet(object.reserveScript) ? String(object.reserveScript) : "",
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgRegisterReserveAddress): unknown {
    const obj: any = {};
    message.reserveScript !== undefined && (obj.reserveScript = message.reserveScript);
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRegisterReserveAddress>): MsgRegisterReserveAddress {
    const message = createBaseMsgRegisterReserveAddress();
    message.reserveScript = object.reserveScript ?? "";
    message.reserveAddress = object.reserveAddress ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgRegisterReserveAddressResponse(): MsgRegisterReserveAddressResponse {
  return {
    reserveId: "",
    reserveAddress: ""
  };
}

export const MsgRegisterReserveAddressResponse = {
  encode(message: MsgRegisterReserveAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveId !== "") {
      writer.uint32(10).string(message.reserveId);
    }

    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterReserveAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterReserveAddressResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = reader.string();
          break;

        case 2:
          message.reserveAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgRegisterReserveAddressResponse {
    return {
      reserveId: isSet(object.reserveId) ? String(object.reserveId) : "",
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : ""
    };
  },

  toJSON(message: MsgRegisterReserveAddressResponse): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = message.reserveId);
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRegisterReserveAddressResponse>): MsgRegisterReserveAddressResponse {
    const message = createBaseMsgRegisterReserveAddressResponse();
    message.reserveId = object.reserveId ?? "";
    message.reserveAddress = object.reserveAddress ?? "";
    return message;
  }

};

function createBaseMsgRegisterJudge(): MsgRegisterJudge {
  return {
    creator: "",
    judgeAddress: "",
    validatorAddress: ""
  };
}

export const MsgRegisterJudge = {
  encode(message: MsgRegisterJudge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(18).string(message.judgeAddress);
    }

    if (message.validatorAddress !== "") {
      writer.uint32(26).string(message.validatorAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterJudge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterJudge();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;

        case 2:
          message.judgeAddress = reader.string();
          break;

        case 3:
          message.validatorAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgRegisterJudge {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : ""
    };
  },

  toJSON(message: MsgRegisterJudge): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRegisterJudge>): MsgRegisterJudge {
    const message = createBaseMsgRegisterJudge();
    message.creator = object.creator ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  }

};

function createBaseMsgRegisterJudgeResponse(): MsgRegisterJudgeResponse {
  return {};
}

export const MsgRegisterJudgeResponse = {
  encode(_: MsgRegisterJudgeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterJudgeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterJudgeResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgRegisterJudgeResponse {
    return {};
  },

  toJSON(_: MsgRegisterJudgeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgRegisterJudgeResponse>): MsgRegisterJudgeResponse {
    const message = createBaseMsgRegisterJudgeResponse();
    return message;
  }

};

function createBaseMsgWithdrawBtcRequest(): MsgWithdrawBtcRequest {
  return {
    withdrawAddress: "",
    reserveAddress: "",
    withdrawAmount: Long.UZERO,
    twilightAddress: ""
  };
}

export const MsgWithdrawBtcRequest = {
  encode(message: MsgWithdrawBtcRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.withdrawAddress !== "") {
      writer.uint32(10).string(message.withdrawAddress);
    }

    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }

    if (!message.withdrawAmount.isZero()) {
      writer.uint32(24).uint64(message.withdrawAmount);
    }

    if (message.twilightAddress !== "") {
      writer.uint32(34).string(message.twilightAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawBtcRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBtcRequest();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.withdrawAddress = reader.string();
          break;

        case 2:
          message.reserveAddress = reader.string();
          break;

        case 3:
          message.withdrawAmount = (reader.uint64() as Long);
          break;

        case 4:
          message.twilightAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgWithdrawBtcRequest {
    return {
      withdrawAddress: isSet(object.withdrawAddress) ? String(object.withdrawAddress) : "",
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      withdrawAmount: isSet(object.withdrawAmount) ? Long.fromValue(object.withdrawAmount) : Long.UZERO,
      twilightAddress: isSet(object.twilightAddress) ? String(object.twilightAddress) : ""
    };
  },

  toJSON(message: MsgWithdrawBtcRequest): unknown {
    const obj: any = {};
    message.withdrawAddress !== undefined && (obj.withdrawAddress = message.withdrawAddress);
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.withdrawAmount !== undefined && (obj.withdrawAmount = (message.withdrawAmount || Long.UZERO).toString());
    message.twilightAddress !== undefined && (obj.twilightAddress = message.twilightAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgWithdrawBtcRequest>): MsgWithdrawBtcRequest {
    const message = createBaseMsgWithdrawBtcRequest();
    message.withdrawAddress = object.withdrawAddress ?? "";
    message.reserveAddress = object.reserveAddress ?? "";
    message.withdrawAmount = object.withdrawAmount !== undefined && object.withdrawAmount !== null ? Long.fromValue(object.withdrawAmount) : Long.UZERO;
    message.twilightAddress = object.twilightAddress ?? "";
    return message;
  }

};

function createBaseMsgWithdrawBtcRequestResponse(): MsgWithdrawBtcRequestResponse {
  return {};
}

export const MsgWithdrawBtcRequestResponse = {
  encode(_: MsgWithdrawBtcRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawBtcRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBtcRequestResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgWithdrawBtcRequestResponse {
    return {};
  },

  toJSON(_: MsgWithdrawBtcRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgWithdrawBtcRequestResponse>): MsgWithdrawBtcRequestResponse {
    const message = createBaseMsgWithdrawBtcRequestResponse();
    return message;
  }

};

function createBaseMsgWithdrawTxSigned(): MsgWithdrawTxSigned {
  return {
    creator: "",
    validatorAddress: "",
    btcTxSigned: ""
  };
}

export const MsgWithdrawTxSigned = {
  encode(message: MsgWithdrawTxSigned, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }

    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }

    if (message.btcTxSigned !== "") {
      writer.uint32(26).string(message.btcTxSigned);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxSigned {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxSigned();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;

        case 2:
          message.validatorAddress = reader.string();
          break;

        case 3:
          message.btcTxSigned = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgWithdrawTxSigned {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      btcTxSigned: isSet(object.btcTxSigned) ? String(object.btcTxSigned) : ""
    };
  },

  toJSON(message: MsgWithdrawTxSigned): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.btcTxSigned !== undefined && (obj.btcTxSigned = message.btcTxSigned);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgWithdrawTxSigned>): MsgWithdrawTxSigned {
    const message = createBaseMsgWithdrawTxSigned();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.btcTxSigned = object.btcTxSigned ?? "";
    return message;
  }

};

function createBaseMsgWithdrawTxSignedResponse(): MsgWithdrawTxSignedResponse {
  return {};
}

export const MsgWithdrawTxSignedResponse = {
  encode(_: MsgWithdrawTxSignedResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxSignedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxSignedResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgWithdrawTxSignedResponse {
    return {};
  },

  toJSON(_: MsgWithdrawTxSignedResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgWithdrawTxSignedResponse>): MsgWithdrawTxSignedResponse {
    const message = createBaseMsgWithdrawTxSignedResponse();
    return message;
  }

};

function createBaseMsgWithdrawTxFinal(): MsgWithdrawTxFinal {
  return {
    creator: "",
    judgeAddress: "",
    btcTx: ""
  };
}

export const MsgWithdrawTxFinal = {
  encode(message: MsgWithdrawTxFinal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(18).string(message.judgeAddress);
    }

    if (message.btcTx !== "") {
      writer.uint32(26).string(message.btcTx);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxFinal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxFinal();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;

        case 2:
          message.judgeAddress = reader.string();
          break;

        case 3:
          message.btcTx = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgWithdrawTxFinal {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : "",
      btcTx: isSet(object.btcTx) ? String(object.btcTx) : ""
    };
  },

  toJSON(message: MsgWithdrawTxFinal): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    message.btcTx !== undefined && (obj.btcTx = message.btcTx);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgWithdrawTxFinal>): MsgWithdrawTxFinal {
    const message = createBaseMsgWithdrawTxFinal();
    message.creator = object.creator ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    message.btcTx = object.btcTx ?? "";
    return message;
  }

};

function createBaseMsgWithdrawTxFinalResponse(): MsgWithdrawTxFinalResponse {
  return {};
}

export const MsgWithdrawTxFinalResponse = {
  encode(_: MsgWithdrawTxFinalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxFinalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxFinalResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgWithdrawTxFinalResponse {
    return {};
  },

  toJSON(_: MsgWithdrawTxFinalResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgWithdrawTxFinalResponse>): MsgWithdrawTxFinalResponse {
    const message = createBaseMsgWithdrawTxFinalResponse();
    return message;
  }

};

function createBaseMsgProposeRefundHash(): MsgProposeRefundHash {
  return {
    refundHash: "",
    judgeAddress: ""
  };
}

export const MsgProposeRefundHash = {
  encode(message: MsgProposeRefundHash, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refundHash !== "") {
      writer.uint32(10).string(message.refundHash);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(18).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRefundHash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRefundHash();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.refundHash = reader.string();
          break;

        case 2:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgProposeRefundHash {
    return {
      refundHash: isSet(object.refundHash) ? String(object.refundHash) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgProposeRefundHash): unknown {
    const obj: any = {};
    message.refundHash !== undefined && (obj.refundHash = message.refundHash);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgProposeRefundHash>): MsgProposeRefundHash {
    const message = createBaseMsgProposeRefundHash();
    message.refundHash = object.refundHash ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgProposeRefundHashResponse(): MsgProposeRefundHashResponse {
  return {};
}

export const MsgProposeRefundHashResponse = {
  encode(_: MsgProposeRefundHashResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRefundHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRefundHashResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgProposeRefundHashResponse {
    return {};
  },

  toJSON(_: MsgProposeRefundHashResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgProposeRefundHashResponse>): MsgProposeRefundHashResponse {
    const message = createBaseMsgProposeRefundHashResponse();
    return message;
  }

};

function createBaseMsgConfirmBtcWithdraw(): MsgConfirmBtcWithdraw {
  return {
    txHash: "",
    height: Long.UZERO,
    hash: "",
    judgeAddress: ""
  };
}

export const MsgConfirmBtcWithdraw = {
  encode(message: MsgConfirmBtcWithdraw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }

    if (!message.height.isZero()) {
      writer.uint32(16).uint64(message.height);
    }

    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(34).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcWithdraw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcWithdraw();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;

        case 2:
          message.height = (reader.uint64() as Long);
          break;

        case 3:
          message.hash = reader.string();
          break;

        case 4:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgConfirmBtcWithdraw {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      hash: isSet(object.hash) ? String(object.hash) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgConfirmBtcWithdraw): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.hash !== undefined && (obj.hash = message.hash);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgConfirmBtcWithdraw>): MsgConfirmBtcWithdraw {
    const message = createBaseMsgConfirmBtcWithdraw();
    message.txHash = object.txHash ?? "";
    message.height = object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.UZERO;
    message.hash = object.hash ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgConfirmBtcWithdrawResponse(): MsgConfirmBtcWithdrawResponse {
  return {};
}

export const MsgConfirmBtcWithdrawResponse = {
  encode(_: MsgConfirmBtcWithdrawResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcWithdrawResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgConfirmBtcWithdrawResponse {
    return {};
  },

  toJSON(_: MsgConfirmBtcWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgConfirmBtcWithdrawResponse>): MsgConfirmBtcWithdrawResponse {
    const message = createBaseMsgConfirmBtcWithdrawResponse();
    return message;
  }

};

function createBaseMsgProposeSweepAddress(): MsgProposeSweepAddress {
  return {
    btcAddress: "",
    btcScript: "",
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    judgeAddress: ""
  };
}

export const MsgProposeSweepAddress = {
  encode(message: MsgProposeSweepAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.btcAddress !== "") {
      writer.uint32(10).string(message.btcAddress);
    }

    if (message.btcScript !== "") {
      writer.uint32(18).string(message.btcScript);
    }

    if (!message.reserveId.isZero()) {
      writer.uint32(24).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(32).uint64(message.roundId);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(42).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeSweepAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeSweepAddress();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.btcAddress = reader.string();
          break;

        case 2:
          message.btcScript = reader.string();
          break;

        case 3:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 4:
          message.roundId = (reader.uint64() as Long);
          break;

        case 5:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgProposeSweepAddress {
    return {
      btcAddress: isSet(object.btcAddress) ? String(object.btcAddress) : "",
      btcScript: isSet(object.btcScript) ? String(object.btcScript) : "",
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgProposeSweepAddress): unknown {
    const obj: any = {};
    message.btcAddress !== undefined && (obj.btcAddress = message.btcAddress);
    message.btcScript !== undefined && (obj.btcScript = message.btcScript);
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgProposeSweepAddress>): MsgProposeSweepAddress {
    const message = createBaseMsgProposeSweepAddress();
    message.btcAddress = object.btcAddress ?? "";
    message.btcScript = object.btcScript ?? "";
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgProposeSweepAddressResponse(): MsgProposeSweepAddressResponse {
  return {};
}

export const MsgProposeSweepAddressResponse = {
  encode(_: MsgProposeSweepAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeSweepAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeSweepAddressResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgProposeSweepAddressResponse {
    return {};
  },

  toJSON(_: MsgProposeSweepAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgProposeSweepAddressResponse>): MsgProposeSweepAddressResponse {
    const message = createBaseMsgProposeSweepAddressResponse();
    return message;
  }

};

function createBaseMsgUnsignedTxSweep(): MsgUnsignedTxSweep {
  return {
    txId: "",
    btcUnsignedSweepTx: "",
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    judgeAddress: ""
  };
}

export const MsgUnsignedTxSweep = {
  encode(message: MsgUnsignedTxSweep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }

    if (message.btcUnsignedSweepTx !== "") {
      writer.uint32(18).string(message.btcUnsignedSweepTx);
    }

    if (!message.reserveId.isZero()) {
      writer.uint32(24).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(32).uint64(message.roundId);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(42).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnsignedTxSweep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnsignedTxSweep();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;

        case 2:
          message.btcUnsignedSweepTx = reader.string();
          break;

        case 3:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 4:
          message.roundId = (reader.uint64() as Long);
          break;

        case 5:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgUnsignedTxSweep {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      btcUnsignedSweepTx: isSet(object.btcUnsignedSweepTx) ? String(object.btcUnsignedSweepTx) : "",
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgUnsignedTxSweep): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    message.btcUnsignedSweepTx !== undefined && (obj.btcUnsignedSweepTx = message.btcUnsignedSweepTx);
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUnsignedTxSweep>): MsgUnsignedTxSweep {
    const message = createBaseMsgUnsignedTxSweep();
    message.txId = object.txId ?? "";
    message.btcUnsignedSweepTx = object.btcUnsignedSweepTx ?? "";
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgUnsignedTxSweepResponse(): MsgUnsignedTxSweepResponse {
  return {};
}

export const MsgUnsignedTxSweepResponse = {
  encode(_: MsgUnsignedTxSweepResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnsignedTxSweepResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnsignedTxSweepResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgUnsignedTxSweepResponse {
    return {};
  },

  toJSON(_: MsgUnsignedTxSweepResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUnsignedTxSweepResponse>): MsgUnsignedTxSweepResponse {
    const message = createBaseMsgUnsignedTxSweepResponse();
    return message;
  }

};

function createBaseMsgUnsignedTxRefund(): MsgUnsignedTxRefund {
  return {
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    btcUnsignedRefundTx: "",
    judgeAddress: ""
  };
}

export const MsgUnsignedTxRefund = {
  encode(message: MsgUnsignedTxRefund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(16).uint64(message.roundId);
    }

    if (message.btcUnsignedRefundTx !== "") {
      writer.uint32(26).string(message.btcUnsignedRefundTx);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(34).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnsignedTxRefund {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnsignedTxRefund();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.roundId = (reader.uint64() as Long);
          break;

        case 3:
          message.btcUnsignedRefundTx = reader.string();
          break;

        case 4:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgUnsignedTxRefund {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      btcUnsignedRefundTx: isSet(object.btcUnsignedRefundTx) ? String(object.btcUnsignedRefundTx) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgUnsignedTxRefund): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.btcUnsignedRefundTx !== undefined && (obj.btcUnsignedRefundTx = message.btcUnsignedRefundTx);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUnsignedTxRefund>): MsgUnsignedTxRefund {
    const message = createBaseMsgUnsignedTxRefund();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.btcUnsignedRefundTx = object.btcUnsignedRefundTx ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgUnsignedTxRefundResponse(): MsgUnsignedTxRefundResponse {
  return {};
}

export const MsgUnsignedTxRefundResponse = {
  encode(_: MsgUnsignedTxRefundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnsignedTxRefundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnsignedTxRefundResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgUnsignedTxRefundResponse {
    return {};
  },

  toJSON(_: MsgUnsignedTxRefundResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUnsignedTxRefundResponse>): MsgUnsignedTxRefundResponse {
    const message = createBaseMsgUnsignedTxRefundResponse();
    return message;
  }

};

function createBaseMsgSignRefund(): MsgSignRefund {
  return {
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    signerPublicKey: "",
    refundSignature: "",
    btcOracleAddress: ""
  };
}

export const MsgSignRefund = {
  encode(message: MsgSignRefund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(16).uint64(message.roundId);
    }

    if (message.signerPublicKey !== "") {
      writer.uint32(26).string(message.signerPublicKey);
    }

    if (message.refundSignature !== "") {
      writer.uint32(34).string(message.refundSignature);
    }

    if (message.btcOracleAddress !== "") {
      writer.uint32(42).string(message.btcOracleAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignRefund {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignRefund();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.roundId = (reader.uint64() as Long);
          break;

        case 3:
          message.signerPublicKey = reader.string();
          break;

        case 4:
          message.refundSignature = reader.string();
          break;

        case 5:
          message.btcOracleAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSignRefund {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      signerPublicKey: isSet(object.signerPublicKey) ? String(object.signerPublicKey) : "",
      refundSignature: isSet(object.refundSignature) ? String(object.refundSignature) : "",
      btcOracleAddress: isSet(object.btcOracleAddress) ? String(object.btcOracleAddress) : ""
    };
  },

  toJSON(message: MsgSignRefund): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.signerPublicKey !== undefined && (obj.signerPublicKey = message.signerPublicKey);
    message.refundSignature !== undefined && (obj.refundSignature = message.refundSignature);
    message.btcOracleAddress !== undefined && (obj.btcOracleAddress = message.btcOracleAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSignRefund>): MsgSignRefund {
    const message = createBaseMsgSignRefund();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.signerPublicKey = object.signerPublicKey ?? "";
    message.refundSignature = object.refundSignature ?? "";
    message.btcOracleAddress = object.btcOracleAddress ?? "";
    return message;
  }

};

function createBaseMsgSignRefundResponse(): MsgSignRefundResponse {
  return {};
}

export const MsgSignRefundResponse = {
  encode(_: MsgSignRefundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignRefundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignRefundResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSignRefundResponse {
    return {};
  },

  toJSON(_: MsgSignRefundResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSignRefundResponse>): MsgSignRefundResponse {
    const message = createBaseMsgSignRefundResponse();
    return message;
  }

};

function createBaseMsgSignSweep(): MsgSignSweep {
  return {
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    signerPublicKey: "",
    sweepSignature: [],
    btcOracleAddress: ""
  };
}

export const MsgSignSweep = {
  encode(message: MsgSignSweep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(16).uint64(message.roundId);
    }

    if (message.signerPublicKey !== "") {
      writer.uint32(26).string(message.signerPublicKey);
    }

    for (const v of message.sweepSignature) {
      writer.uint32(34).string(v!);
    }

    if (message.btcOracleAddress !== "") {
      writer.uint32(42).string(message.btcOracleAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignSweep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignSweep();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.roundId = (reader.uint64() as Long);
          break;

        case 3:
          message.signerPublicKey = reader.string();
          break;

        case 4:
          message.sweepSignature.push(reader.string());
          break;

        case 5:
          message.btcOracleAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSignSweep {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      signerPublicKey: isSet(object.signerPublicKey) ? String(object.signerPublicKey) : "",
      sweepSignature: Array.isArray(object?.sweepSignature) ? object.sweepSignature.map((e: any) => String(e)) : [],
      btcOracleAddress: isSet(object.btcOracleAddress) ? String(object.btcOracleAddress) : ""
    };
  },

  toJSON(message: MsgSignSweep): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.signerPublicKey !== undefined && (obj.signerPublicKey = message.signerPublicKey);

    if (message.sweepSignature) {
      obj.sweepSignature = message.sweepSignature.map(e => e);
    } else {
      obj.sweepSignature = [];
    }

    message.btcOracleAddress !== undefined && (obj.btcOracleAddress = message.btcOracleAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSignSweep>): MsgSignSweep {
    const message = createBaseMsgSignSweep();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.signerPublicKey = object.signerPublicKey ?? "";
    message.sweepSignature = object.sweepSignature?.map(e => e) || [];
    message.btcOracleAddress = object.btcOracleAddress ?? "";
    return message;
  }

};

function createBaseMsgSignSweepResponse(): MsgSignSweepResponse {
  return {};
}

export const MsgSignSweepResponse = {
  encode(_: MsgSignSweepResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignSweepResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignSweepResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSignSweepResponse {
    return {};
  },

  toJSON(_: MsgSignSweepResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSignSweepResponse>): MsgSignSweepResponse {
    const message = createBaseMsgSignSweepResponse();
    return message;
  }

};

function createBaseMsgBroadcastTxRefund(): MsgBroadcastTxRefund {
  return {
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    signedRefundTx: "",
    judgeAddress: ""
  };
}

export const MsgBroadcastTxRefund = {
  encode(message: MsgBroadcastTxRefund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(16).uint64(message.roundId);
    }

    if (message.signedRefundTx !== "") {
      writer.uint32(26).string(message.signedRefundTx);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(34).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBroadcastTxRefund {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBroadcastTxRefund();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.roundId = (reader.uint64() as Long);
          break;

        case 3:
          message.signedRefundTx = reader.string();
          break;

        case 4:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgBroadcastTxRefund {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      signedRefundTx: isSet(object.signedRefundTx) ? String(object.signedRefundTx) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgBroadcastTxRefund): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.signedRefundTx !== undefined && (obj.signedRefundTx = message.signedRefundTx);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgBroadcastTxRefund>): MsgBroadcastTxRefund {
    const message = createBaseMsgBroadcastTxRefund();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.signedRefundTx = object.signedRefundTx ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgBroadcastTxRefundResponse(): MsgBroadcastTxRefundResponse {
  return {};
}

export const MsgBroadcastTxRefundResponse = {
  encode(_: MsgBroadcastTxRefundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBroadcastTxRefundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBroadcastTxRefundResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgBroadcastTxRefundResponse {
    return {};
  },

  toJSON(_: MsgBroadcastTxRefundResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgBroadcastTxRefundResponse>): MsgBroadcastTxRefundResponse {
    const message = createBaseMsgBroadcastTxRefundResponse();
    return message;
  }

};

function createBaseMsgBroadcastTxSweep(): MsgBroadcastTxSweep {
  return {
    reserveId: Long.UZERO,
    roundId: Long.UZERO,
    signedSweepTx: "",
    judgeAddress: ""
  };
}

export const MsgBroadcastTxSweep = {
  encode(message: MsgBroadcastTxSweep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(16).uint64(message.roundId);
    }

    if (message.signedSweepTx !== "") {
      writer.uint32(26).string(message.signedSweepTx);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(34).string(message.judgeAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBroadcastTxSweep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBroadcastTxSweep();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.roundId = (reader.uint64() as Long);
          break;

        case 3:
          message.signedSweepTx = reader.string();
          break;

        case 4:
          message.judgeAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgBroadcastTxSweep {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      signedSweepTx: isSet(object.signedSweepTx) ? String(object.signedSweepTx) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },

  toJSON(message: MsgBroadcastTxSweep): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());
    message.signedSweepTx !== undefined && (obj.signedSweepTx = message.signedSweepTx);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgBroadcastTxSweep>): MsgBroadcastTxSweep {
    const message = createBaseMsgBroadcastTxSweep();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.signedSweepTx = object.signedSweepTx ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }

};

function createBaseMsgBroadcastTxSweepResponse(): MsgBroadcastTxSweepResponse {
  return {};
}

export const MsgBroadcastTxSweepResponse = {
  encode(_: MsgBroadcastTxSweepResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBroadcastTxSweepResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBroadcastTxSweepResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgBroadcastTxSweepResponse {
    return {};
  },

  toJSON(_: MsgBroadcastTxSweepResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgBroadcastTxSweepResponse>): MsgBroadcastTxSweepResponse {
    const message = createBaseMsgBroadcastTxSweepResponse();
    return message;
  }

};

function createBaseMsgSweepProposal(): MsgSweepProposal {
  return {
    reserveId: Long.UZERO,
    newReserveAddress: "",
    judgeAddress: "",
    BtcBlockNumber: Long.UZERO,
    btcRelayCapacityValue: Long.UZERO,
    btcTxHash: "",
    UnlockHeight: Long.UZERO,
    roundId: Long.UZERO,
    withdrawIdentifiers: []
  };
}

export const MsgSweepProposal = {
  encode(message: MsgSweepProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }

    if (message.newReserveAddress !== "") {
      writer.uint32(18).string(message.newReserveAddress);
    }

    if (message.judgeAddress !== "") {
      writer.uint32(26).string(message.judgeAddress);
    }

    if (!message.BtcBlockNumber.isZero()) {
      writer.uint32(32).uint64(message.BtcBlockNumber);
    }

    if (!message.btcRelayCapacityValue.isZero()) {
      writer.uint32(40).uint64(message.btcRelayCapacityValue);
    }

    if (message.btcTxHash !== "") {
      writer.uint32(50).string(message.btcTxHash);
    }

    if (!message.UnlockHeight.isZero()) {
      writer.uint32(56).uint64(message.UnlockHeight);
    }

    if (!message.roundId.isZero()) {
      writer.uint32(64).uint64(message.roundId);
    }

    for (const v of message.withdrawIdentifiers) {
      writer.uint32(74).string(v!);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSweepProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSweepProposal();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.newReserveAddress = reader.string();
          break;

        case 3:
          message.judgeAddress = reader.string();
          break;

        case 4:
          message.BtcBlockNumber = (reader.uint64() as Long);
          break;

        case 5:
          message.btcRelayCapacityValue = (reader.uint64() as Long);
          break;

        case 6:
          message.btcTxHash = reader.string();
          break;

        case 7:
          message.UnlockHeight = (reader.uint64() as Long);
          break;

        case 8:
          message.roundId = (reader.uint64() as Long);
          break;

        case 9:
          message.withdrawIdentifiers.push(reader.string());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSweepProposal {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      newReserveAddress: isSet(object.newReserveAddress) ? String(object.newReserveAddress) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : "",
      BtcBlockNumber: isSet(object.BtcBlockNumber) ? Long.fromValue(object.BtcBlockNumber) : Long.UZERO,
      btcRelayCapacityValue: isSet(object.btcRelayCapacityValue) ? Long.fromValue(object.btcRelayCapacityValue) : Long.UZERO,
      btcTxHash: isSet(object.btcTxHash) ? String(object.btcTxHash) : "",
      UnlockHeight: isSet(object.UnlockHeight) ? Long.fromValue(object.UnlockHeight) : Long.UZERO,
      roundId: isSet(object.roundId) ? Long.fromValue(object.roundId) : Long.UZERO,
      withdrawIdentifiers: Array.isArray(object?.withdrawIdentifiers) ? object.withdrawIdentifiers.map((e: any) => String(e)) : []
    };
  },

  toJSON(message: MsgSweepProposal): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.newReserveAddress !== undefined && (obj.newReserveAddress = message.newReserveAddress);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    message.BtcBlockNumber !== undefined && (obj.BtcBlockNumber = (message.BtcBlockNumber || Long.UZERO).toString());
    message.btcRelayCapacityValue !== undefined && (obj.btcRelayCapacityValue = (message.btcRelayCapacityValue || Long.UZERO).toString());
    message.btcTxHash !== undefined && (obj.btcTxHash = message.btcTxHash);
    message.UnlockHeight !== undefined && (obj.UnlockHeight = (message.UnlockHeight || Long.UZERO).toString());
    message.roundId !== undefined && (obj.roundId = (message.roundId || Long.UZERO).toString());

    if (message.withdrawIdentifiers) {
      obj.withdrawIdentifiers = message.withdrawIdentifiers.map(e => e);
    } else {
      obj.withdrawIdentifiers = [];
    }

    return obj;
  },

  fromPartial(object: DeepPartial<MsgSweepProposal>): MsgSweepProposal {
    const message = createBaseMsgSweepProposal();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.newReserveAddress = object.newReserveAddress ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    message.BtcBlockNumber = object.BtcBlockNumber !== undefined && object.BtcBlockNumber !== null ? Long.fromValue(object.BtcBlockNumber) : Long.UZERO;
    message.btcRelayCapacityValue = object.btcRelayCapacityValue !== undefined && object.btcRelayCapacityValue !== null ? Long.fromValue(object.btcRelayCapacityValue) : Long.UZERO;
    message.btcTxHash = object.btcTxHash ?? "";
    message.UnlockHeight = object.UnlockHeight !== undefined && object.UnlockHeight !== null ? Long.fromValue(object.UnlockHeight) : Long.UZERO;
    message.roundId = object.roundId !== undefined && object.roundId !== null ? Long.fromValue(object.roundId) : Long.UZERO;
    message.withdrawIdentifiers = object.withdrawIdentifiers?.map(e => e) || [];
    return message;
  }

};

function createBaseMsgSweepProposalResponse(): MsgSweepProposalResponse {
  return {};
}

export const MsgSweepProposalResponse = {
  encode(_: MsgSweepProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSweepProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSweepProposalResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSweepProposalResponse {
    return {};
  },

  toJSON(_: MsgSweepProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSweepProposalResponse>): MsgSweepProposalResponse {
    const message = createBaseMsgSweepProposalResponse();
    return message;
  }

};