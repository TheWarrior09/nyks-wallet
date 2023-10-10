import { Long, isSet, DeepPartial, bytesFromBase64, base64FromBytes } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
/**
 * BtcReserve is a mapping of a validator address to a reserve ID
 * It holds other values in the reserve struct such as total
 * value, private pool value, public pool value, and the btc relay capacity value
 */

export interface BtcReserve {
  ReserveId: Long;
  ReserveAddress: string;
  JudgeAddress: string;
  BtcRelayCapacityValue: Long;
  TotalValue: Long;
  PrivatePoolValue: Long;
  PublicValue: Long;
  FeePool: Long;
  UnlockHeight: Long;
  RoundId: Long;
}
/**
 * BtcReserve is a mapping of a validator address to a reserve ID
 * It holds other values in the reserve struct such as total
 * value, private pool value, public pool value, and the btc relay capacity value
 */

export interface BtcReserveSDKType {
  ReserveId: Long;
  ReserveAddress: string;
  JudgeAddress: string;
  BtcRelayCapacityValue: Long;
  TotalValue: Long;
  PrivatePoolValue: Long;
  PublicValue: Long;
  FeePool: Long;
  UnlockHeight: Long;
  RoundId: Long;
}
export interface ReserveWithdrawPool {
  ReserveID: Long;
  RoundID: Long;
  /** vector of identifiers */

  Identifiers: Uint8Array[];
}
export interface ReserveWithdrawPoolSDKType {
  ReserveID: Long;
  RoundID: Long;
  Identifiers: Uint8Array[];
}

function createBaseBtcReserve(): BtcReserve {
  return {
    ReserveId: Long.UZERO,
    ReserveAddress: "",
    JudgeAddress: "",
    BtcRelayCapacityValue: Long.UZERO,
    TotalValue: Long.UZERO,
    PrivatePoolValue: Long.UZERO,
    PublicValue: Long.UZERO,
    FeePool: Long.UZERO,
    UnlockHeight: Long.UZERO,
    RoundId: Long.UZERO
  };
}

export const BtcReserve = {
  encode(message: BtcReserve, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ReserveId.isZero()) {
      writer.uint32(8).uint64(message.ReserveId);
    }

    if (message.ReserveAddress !== "") {
      writer.uint32(18).string(message.ReserveAddress);
    }

    if (message.JudgeAddress !== "") {
      writer.uint32(26).string(message.JudgeAddress);
    }

    if (!message.BtcRelayCapacityValue.isZero()) {
      writer.uint32(32).uint64(message.BtcRelayCapacityValue);
    }

    if (!message.TotalValue.isZero()) {
      writer.uint32(40).uint64(message.TotalValue);
    }

    if (!message.PrivatePoolValue.isZero()) {
      writer.uint32(48).uint64(message.PrivatePoolValue);
    }

    if (!message.PublicValue.isZero()) {
      writer.uint32(56).uint64(message.PublicValue);
    }

    if (!message.FeePool.isZero()) {
      writer.uint32(64).uint64(message.FeePool);
    }

    if (!message.UnlockHeight.isZero()) {
      writer.uint32(72).uint64(message.UnlockHeight);
    }

    if (!message.RoundId.isZero()) {
      writer.uint32(80).uint64(message.RoundId);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BtcReserve {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBtcReserve();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.ReserveId = (reader.uint64() as Long);
          break;

        case 2:
          message.ReserveAddress = reader.string();
          break;

        case 3:
          message.JudgeAddress = reader.string();
          break;

        case 4:
          message.BtcRelayCapacityValue = (reader.uint64() as Long);
          break;

        case 5:
          message.TotalValue = (reader.uint64() as Long);
          break;

        case 6:
          message.PrivatePoolValue = (reader.uint64() as Long);
          break;

        case 7:
          message.PublicValue = (reader.uint64() as Long);
          break;

        case 8:
          message.FeePool = (reader.uint64() as Long);
          break;

        case 9:
          message.UnlockHeight = (reader.uint64() as Long);
          break;

        case 10:
          message.RoundId = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): BtcReserve {
    return {
      ReserveId: isSet(object.ReserveId) ? Long.fromValue(object.ReserveId) : Long.UZERO,
      ReserveAddress: isSet(object.ReserveAddress) ? String(object.ReserveAddress) : "",
      JudgeAddress: isSet(object.JudgeAddress) ? String(object.JudgeAddress) : "",
      BtcRelayCapacityValue: isSet(object.BtcRelayCapacityValue) ? Long.fromValue(object.BtcRelayCapacityValue) : Long.UZERO,
      TotalValue: isSet(object.TotalValue) ? Long.fromValue(object.TotalValue) : Long.UZERO,
      PrivatePoolValue: isSet(object.PrivatePoolValue) ? Long.fromValue(object.PrivatePoolValue) : Long.UZERO,
      PublicValue: isSet(object.PublicValue) ? Long.fromValue(object.PublicValue) : Long.UZERO,
      FeePool: isSet(object.FeePool) ? Long.fromValue(object.FeePool) : Long.UZERO,
      UnlockHeight: isSet(object.UnlockHeight) ? Long.fromValue(object.UnlockHeight) : Long.UZERO,
      RoundId: isSet(object.RoundId) ? Long.fromValue(object.RoundId) : Long.UZERO
    };
  },

  toJSON(message: BtcReserve): unknown {
    const obj: any = {};
    message.ReserveId !== undefined && (obj.ReserveId = (message.ReserveId || Long.UZERO).toString());
    message.ReserveAddress !== undefined && (obj.ReserveAddress = message.ReserveAddress);
    message.JudgeAddress !== undefined && (obj.JudgeAddress = message.JudgeAddress);
    message.BtcRelayCapacityValue !== undefined && (obj.BtcRelayCapacityValue = (message.BtcRelayCapacityValue || Long.UZERO).toString());
    message.TotalValue !== undefined && (obj.TotalValue = (message.TotalValue || Long.UZERO).toString());
    message.PrivatePoolValue !== undefined && (obj.PrivatePoolValue = (message.PrivatePoolValue || Long.UZERO).toString());
    message.PublicValue !== undefined && (obj.PublicValue = (message.PublicValue || Long.UZERO).toString());
    message.FeePool !== undefined && (obj.FeePool = (message.FeePool || Long.UZERO).toString());
    message.UnlockHeight !== undefined && (obj.UnlockHeight = (message.UnlockHeight || Long.UZERO).toString());
    message.RoundId !== undefined && (obj.RoundId = (message.RoundId || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<BtcReserve>): BtcReserve {
    const message = createBaseBtcReserve();
    message.ReserveId = object.ReserveId !== undefined && object.ReserveId !== null ? Long.fromValue(object.ReserveId) : Long.UZERO;
    message.ReserveAddress = object.ReserveAddress ?? "";
    message.JudgeAddress = object.JudgeAddress ?? "";
    message.BtcRelayCapacityValue = object.BtcRelayCapacityValue !== undefined && object.BtcRelayCapacityValue !== null ? Long.fromValue(object.BtcRelayCapacityValue) : Long.UZERO;
    message.TotalValue = object.TotalValue !== undefined && object.TotalValue !== null ? Long.fromValue(object.TotalValue) : Long.UZERO;
    message.PrivatePoolValue = object.PrivatePoolValue !== undefined && object.PrivatePoolValue !== null ? Long.fromValue(object.PrivatePoolValue) : Long.UZERO;
    message.PublicValue = object.PublicValue !== undefined && object.PublicValue !== null ? Long.fromValue(object.PublicValue) : Long.UZERO;
    message.FeePool = object.FeePool !== undefined && object.FeePool !== null ? Long.fromValue(object.FeePool) : Long.UZERO;
    message.UnlockHeight = object.UnlockHeight !== undefined && object.UnlockHeight !== null ? Long.fromValue(object.UnlockHeight) : Long.UZERO;
    message.RoundId = object.RoundId !== undefined && object.RoundId !== null ? Long.fromValue(object.RoundId) : Long.UZERO;
    return message;
  }

};

function createBaseReserveWithdrawPool(): ReserveWithdrawPool {
  return {
    ReserveID: Long.UZERO,
    RoundID: Long.UZERO,
    Identifiers: []
  };
}

export const ReserveWithdrawPool = {
  encode(message: ReserveWithdrawPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ReserveID.isZero()) {
      writer.uint32(8).uint64(message.ReserveID);
    }

    if (!message.RoundID.isZero()) {
      writer.uint32(16).uint64(message.RoundID);
    }

    for (const v of message.Identifiers) {
      writer.uint32(26).bytes(v!);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReserveWithdrawPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReserveWithdrawPool();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.ReserveID = (reader.uint64() as Long);
          break;

        case 2:
          message.RoundID = (reader.uint64() as Long);
          break;

        case 3:
          message.Identifiers.push(reader.bytes());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ReserveWithdrawPool {
    return {
      ReserveID: isSet(object.ReserveID) ? Long.fromValue(object.ReserveID) : Long.UZERO,
      RoundID: isSet(object.RoundID) ? Long.fromValue(object.RoundID) : Long.UZERO,
      Identifiers: Array.isArray(object?.Identifiers) ? object.Identifiers.map((e: any) => bytesFromBase64(e)) : []
    };
  },

  toJSON(message: ReserveWithdrawPool): unknown {
    const obj: any = {};
    message.ReserveID !== undefined && (obj.ReserveID = (message.ReserveID || Long.UZERO).toString());
    message.RoundID !== undefined && (obj.RoundID = (message.RoundID || Long.UZERO).toString());

    if (message.Identifiers) {
      obj.Identifiers = message.Identifiers.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.Identifiers = [];
    }

    return obj;
  },

  fromPartial(object: DeepPartial<ReserveWithdrawPool>): ReserveWithdrawPool {
    const message = createBaseReserveWithdrawPool();
    message.ReserveID = object.ReserveID !== undefined && object.ReserveID !== null ? Long.fromValue(object.ReserveID) : Long.UZERO;
    message.RoundID = object.RoundID !== undefined && object.RoundID !== null ? Long.fromValue(object.RoundID) : Long.UZERO;
    message.Identifiers = object.Identifiers?.map(e => e) || [];
    return message;
  }

};