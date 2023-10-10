import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../helpers";
import { MsgConfirmBtcDeposit, MsgRegisterBtcDepositAddress, MsgRegisterReserveAddress, MsgRegisterJudge, MsgWithdrawBtcRequest, MsgSweepProposal, MsgWithdrawTxSigned, MsgWithdrawTxFinal, MsgSignRefund, MsgBroadcastTxSweep, MsgSignSweep, MsgProposeRefundHash, MsgConfirmBtcWithdraw, MsgUnsignedTxSweep, MsgUnsignedTxRefund, MsgBroadcastTxRefund, MsgProposeSweepAddress } from "./tx";
export interface MsgConfirmBtcDepositAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit";
  value: {
    reserveAddress: string;
    depositAmount: string;
    height: string;
    hash: string;
    twilightDepositAddress: string;
    oracleAddress: string;
  };
}
export interface MsgRegisterBtcDepositAddressAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress";
  value: {
    btcDepositAddress: string;
    btcSatoshiTestAmount: string;
    twilightStakingAmount: string;
    twilightAddress: string;
  };
}
export interface MsgRegisterReserveAddressAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress";
  value: {
    reserveScript: string;
    reserveAddress: string;
    judgeAddress: string;
  };
}
export interface MsgRegisterJudgeAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgRegisterJudge";
  value: {
    creator: string;
    judgeAddress: string;
    validatorAddress: string;
  };
}
export interface MsgWithdrawBtcRequestAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest";
  value: {
    withdrawAddress: string;
    reserveAddress: string;
    withdrawAmount: string;
    twilightAddress: string;
  };
}
export interface MsgSweepProposalAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSweepProposal";
  value: {
    reserveId: string;
    newReserveAddress: string;
    judgeAddress: string;
    BtcBlockNumber: string;
    btcRelayCapacityValue: string;
    btcTxHash: string;
    UnlockHeight: string;
    roundId: string;
    withdrawIdentifiers: string[];
  };
}
export interface MsgWithdrawTxSignedAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned";
  value: {
    creator: string;
    validatorAddress: string;
    btcTxSigned: string;
  };
}
export interface MsgWithdrawTxFinalAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal";
  value: {
    creator: string;
    judgeAddress: string;
    btcTx: string;
  };
}
export interface MsgSignRefundAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSignRefund";
  value: {
    reserveId: string;
    roundId: string;
    signerPublicKey: string;
    refundSignature: string;
    btcOracleAddress: string;
  };
}
export interface MsgBroadcastTxSweepAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgBroadcastTxSweep";
  value: {
    reserveId: string;
    roundId: string;
    signedSweepTx: string;
    judgeAddress: string;
  };
}
export interface MsgSignSweepAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSignSweep";
  value: {
    reserveId: string;
    roundId: string;
    signerPublicKey: string;
    sweepSignature: string[];
    btcOracleAddress: string;
  };
}
export interface MsgProposeRefundHashAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgProposeRefundHash";
  value: {
    refundHash: string;
    judgeAddress: string;
  };
}
export interface MsgConfirmBtcWithdrawAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw";
  value: {
    txHash: string;
    height: string;
    hash: string;
    judgeAddress: string;
  };
}
export interface MsgUnsignedTxSweepAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgUnsignedTxSweep";
  value: {
    txId: string;
    btcUnsignedSweepTx: string;
    reserveId: string;
    roundId: string;
    judgeAddress: string;
  };
}
export interface MsgUnsignedTxRefundAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgUnsignedTxRefund";
  value: {
    reserveId: string;
    roundId: string;
    btcUnsignedRefundTx: string;
    judgeAddress: string;
  };
}
export interface MsgBroadcastTxRefundAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgBroadcastTxRefund";
  value: {
    reserveId: string;
    roundId: string;
    signedRefundTx: string;
    judgeAddress: string;
  };
}
export interface MsgProposeSweepAddressAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgProposeSweepAddress";
  value: {
    btcAddress: string;
    btcScript: string;
    reserveId: string;
    roundId: string;
    judgeAddress: string;
  };
}
export const AminoConverter = {
  "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit": {
    aminoType: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
    toAmino: ({
      reserveAddress,
      depositAmount,
      height,
      hash,
      twilightDepositAddress,
      oracleAddress
    }: MsgConfirmBtcDeposit): MsgConfirmBtcDepositAminoType["value"] => {
      return {
        reserveAddress,
        depositAmount: depositAmount.toString(),
        height: height.toString(),
        hash,
        twilightDepositAddress,
        oracleAddress
      };
    },
    fromAmino: ({
      reserveAddress,
      depositAmount,
      height,
      hash,
      twilightDepositAddress,
      oracleAddress
    }: MsgConfirmBtcDepositAminoType["value"]): MsgConfirmBtcDeposit => {
      return {
        reserveAddress,
        depositAmount: Long.fromString(depositAmount),
        height: Long.fromString(height),
        hash,
        twilightDepositAddress,
        oracleAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress": {
    aminoType: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
    toAmino: ({
      btcDepositAddress,
      btcSatoshiTestAmount,
      twilightStakingAmount,
      twilightAddress
    }: MsgRegisterBtcDepositAddress): MsgRegisterBtcDepositAddressAminoType["value"] => {
      return {
        btcDepositAddress,
        btcSatoshiTestAmount: btcSatoshiTestAmount.toString(),
        twilightStakingAmount: twilightStakingAmount.toString(),
        twilightAddress
      };
    },
    fromAmino: ({
      btcDepositAddress,
      btcSatoshiTestAmount,
      twilightStakingAmount,
      twilightAddress
    }: MsgRegisterBtcDepositAddressAminoType["value"]): MsgRegisterBtcDepositAddress => {
      return {
        btcDepositAddress,
        btcSatoshiTestAmount: Long.fromString(btcSatoshiTestAmount),
        twilightStakingAmount: Long.fromString(twilightStakingAmount),
        twilightAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgRegisterReserveAddress": {
    aminoType: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
    toAmino: ({
      reserveScript,
      reserveAddress,
      judgeAddress
    }: MsgRegisterReserveAddress): MsgRegisterReserveAddressAminoType["value"] => {
      return {
        reserveScript,
        reserveAddress,
        judgeAddress
      };
    },
    fromAmino: ({
      reserveScript,
      reserveAddress,
      judgeAddress
    }: MsgRegisterReserveAddressAminoType["value"]): MsgRegisterReserveAddress => {
      return {
        reserveScript,
        reserveAddress,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgRegisterJudge": {
    aminoType: "/twilightproject.nyks.bridge.MsgRegisterJudge",
    toAmino: ({
      creator,
      judgeAddress,
      validatorAddress
    }: MsgRegisterJudge): MsgRegisterJudgeAminoType["value"] => {
      return {
        creator,
        judgeAddress,
        validatorAddress
      };
    },
    fromAmino: ({
      creator,
      judgeAddress,
      validatorAddress
    }: MsgRegisterJudgeAminoType["value"]): MsgRegisterJudge => {
      return {
        creator,
        judgeAddress,
        validatorAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest": {
    aminoType: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
    toAmino: ({
      withdrawAddress,
      reserveAddress,
      withdrawAmount,
      twilightAddress
    }: MsgWithdrawBtcRequest): MsgWithdrawBtcRequestAminoType["value"] => {
      return {
        withdrawAddress,
        reserveAddress,
        withdrawAmount: withdrawAmount.toString(),
        twilightAddress
      };
    },
    fromAmino: ({
      withdrawAddress,
      reserveAddress,
      withdrawAmount,
      twilightAddress
    }: MsgWithdrawBtcRequestAminoType["value"]): MsgWithdrawBtcRequest => {
      return {
        withdrawAddress,
        reserveAddress,
        withdrawAmount: Long.fromString(withdrawAmount),
        twilightAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgSweepProposal": {
    aminoType: "/twilightproject.nyks.bridge.MsgSweepProposal",
    toAmino: ({
      reserveId,
      newReserveAddress,
      judgeAddress,
      BtcBlockNumber,
      btcRelayCapacityValue,
      btcTxHash,
      UnlockHeight,
      roundId,
      withdrawIdentifiers
    }: MsgSweepProposal): MsgSweepProposalAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        newReserveAddress,
        judgeAddress,
        BtcBlockNumber: BtcBlockNumber.toString(),
        btcRelayCapacityValue: btcRelayCapacityValue.toString(),
        btcTxHash,
        UnlockHeight: UnlockHeight.toString(),
        roundId: roundId.toString(),
        withdrawIdentifiers
      };
    },
    fromAmino: ({
      reserveId,
      newReserveAddress,
      judgeAddress,
      BtcBlockNumber,
      btcRelayCapacityValue,
      btcTxHash,
      UnlockHeight,
      roundId,
      withdrawIdentifiers
    }: MsgSweepProposalAminoType["value"]): MsgSweepProposal => {
      return {
        reserveId: Long.fromString(reserveId),
        newReserveAddress,
        judgeAddress,
        BtcBlockNumber: Long.fromString(BtcBlockNumber),
        btcRelayCapacityValue: Long.fromString(btcRelayCapacityValue),
        btcTxHash,
        UnlockHeight: Long.fromString(UnlockHeight),
        roundId: Long.fromString(roundId),
        withdrawIdentifiers
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgWithdrawTxSigned": {
    aminoType: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
    toAmino: ({
      creator,
      validatorAddress,
      btcTxSigned
    }: MsgWithdrawTxSigned): MsgWithdrawTxSignedAminoType["value"] => {
      return {
        creator,
        validatorAddress,
        btcTxSigned
      };
    },
    fromAmino: ({
      creator,
      validatorAddress,
      btcTxSigned
    }: MsgWithdrawTxSignedAminoType["value"]): MsgWithdrawTxSigned => {
      return {
        creator,
        validatorAddress,
        btcTxSigned
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgWithdrawTxFinal": {
    aminoType: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
    toAmino: ({
      creator,
      judgeAddress,
      btcTx
    }: MsgWithdrawTxFinal): MsgWithdrawTxFinalAminoType["value"] => {
      return {
        creator,
        judgeAddress,
        btcTx
      };
    },
    fromAmino: ({
      creator,
      judgeAddress,
      btcTx
    }: MsgWithdrawTxFinalAminoType["value"]): MsgWithdrawTxFinal => {
      return {
        creator,
        judgeAddress,
        btcTx
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgSignRefund": {
    aminoType: "/twilightproject.nyks.bridge.MsgSignRefund",
    toAmino: ({
      reserveId,
      roundId,
      signerPublicKey,
      refundSignature,
      btcOracleAddress
    }: MsgSignRefund): MsgSignRefundAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        signerPublicKey,
        refundSignature,
        btcOracleAddress
      };
    },
    fromAmino: ({
      reserveId,
      roundId,
      signerPublicKey,
      refundSignature,
      btcOracleAddress
    }: MsgSignRefundAminoType["value"]): MsgSignRefund => {
      return {
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        signerPublicKey,
        refundSignature,
        btcOracleAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgBroadcastTxSweep": {
    aminoType: "/twilightproject.nyks.bridge.MsgBroadcastTxSweep",
    toAmino: ({
      reserveId,
      roundId,
      signedSweepTx,
      judgeAddress
    }: MsgBroadcastTxSweep): MsgBroadcastTxSweepAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        signedSweepTx,
        judgeAddress
      };
    },
    fromAmino: ({
      reserveId,
      roundId,
      signedSweepTx,
      judgeAddress
    }: MsgBroadcastTxSweepAminoType["value"]): MsgBroadcastTxSweep => {
      return {
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        signedSweepTx,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgSignSweep": {
    aminoType: "/twilightproject.nyks.bridge.MsgSignSweep",
    toAmino: ({
      reserveId,
      roundId,
      signerPublicKey,
      sweepSignature,
      btcOracleAddress
    }: MsgSignSweep): MsgSignSweepAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        signerPublicKey,
        sweepSignature,
        btcOracleAddress
      };
    },
    fromAmino: ({
      reserveId,
      roundId,
      signerPublicKey,
      sweepSignature,
      btcOracleAddress
    }: MsgSignSweepAminoType["value"]): MsgSignSweep => {
      return {
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        signerPublicKey,
        sweepSignature,
        btcOracleAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgProposeRefundHash": {
    aminoType: "/twilightproject.nyks.bridge.MsgProposeRefundHash",
    toAmino: ({
      refundHash,
      judgeAddress
    }: MsgProposeRefundHash): MsgProposeRefundHashAminoType["value"] => {
      return {
        refundHash,
        judgeAddress
      };
    },
    fromAmino: ({
      refundHash,
      judgeAddress
    }: MsgProposeRefundHashAminoType["value"]): MsgProposeRefundHash => {
      return {
        refundHash,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw": {
    aminoType: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
    toAmino: ({
      txHash,
      height,
      hash,
      judgeAddress
    }: MsgConfirmBtcWithdraw): MsgConfirmBtcWithdrawAminoType["value"] => {
      return {
        txHash,
        height: height.toString(),
        hash,
        judgeAddress
      };
    },
    fromAmino: ({
      txHash,
      height,
      hash,
      judgeAddress
    }: MsgConfirmBtcWithdrawAminoType["value"]): MsgConfirmBtcWithdraw => {
      return {
        txHash,
        height: Long.fromString(height),
        hash,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgUnsignedTxSweep": {
    aminoType: "/twilightproject.nyks.bridge.MsgUnsignedTxSweep",
    toAmino: ({
      txId,
      btcUnsignedSweepTx,
      reserveId,
      roundId,
      judgeAddress
    }: MsgUnsignedTxSweep): MsgUnsignedTxSweepAminoType["value"] => {
      return {
        txId,
        btcUnsignedSweepTx,
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        judgeAddress
      };
    },
    fromAmino: ({
      txId,
      btcUnsignedSweepTx,
      reserveId,
      roundId,
      judgeAddress
    }: MsgUnsignedTxSweepAminoType["value"]): MsgUnsignedTxSweep => {
      return {
        txId,
        btcUnsignedSweepTx,
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgUnsignedTxRefund": {
    aminoType: "/twilightproject.nyks.bridge.MsgUnsignedTxRefund",
    toAmino: ({
      reserveId,
      roundId,
      btcUnsignedRefundTx,
      judgeAddress
    }: MsgUnsignedTxRefund): MsgUnsignedTxRefundAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        btcUnsignedRefundTx,
        judgeAddress
      };
    },
    fromAmino: ({
      reserveId,
      roundId,
      btcUnsignedRefundTx,
      judgeAddress
    }: MsgUnsignedTxRefundAminoType["value"]): MsgUnsignedTxRefund => {
      return {
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        btcUnsignedRefundTx,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgBroadcastTxRefund": {
    aminoType: "/twilightproject.nyks.bridge.MsgBroadcastTxRefund",
    toAmino: ({
      reserveId,
      roundId,
      signedRefundTx,
      judgeAddress
    }: MsgBroadcastTxRefund): MsgBroadcastTxRefundAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        signedRefundTx,
        judgeAddress
      };
    },
    fromAmino: ({
      reserveId,
      roundId,
      signedRefundTx,
      judgeAddress
    }: MsgBroadcastTxRefundAminoType["value"]): MsgBroadcastTxRefund => {
      return {
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        signedRefundTx,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgProposeSweepAddress": {
    aminoType: "/twilightproject.nyks.bridge.MsgProposeSweepAddress",
    toAmino: ({
      btcAddress,
      btcScript,
      reserveId,
      roundId,
      judgeAddress
    }: MsgProposeSweepAddress): MsgProposeSweepAddressAminoType["value"] => {
      return {
        btcAddress,
        btcScript,
        reserveId: reserveId.toString(),
        roundId: roundId.toString(),
        judgeAddress
      };
    },
    fromAmino: ({
      btcAddress,
      btcScript,
      reserveId,
      roundId,
      judgeAddress
    }: MsgProposeSweepAddressAminoType["value"]): MsgProposeSweepAddress => {
      return {
        btcAddress,
        btcScript,
        reserveId: Long.fromString(reserveId),
        roundId: Long.fromString(roundId),
        judgeAddress
      };
    }
  }
};