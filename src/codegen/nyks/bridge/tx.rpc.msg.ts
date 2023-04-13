import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgConfirmBtcDeposit, MsgConfirmBtcDepositResponse, MsgRegisterBtcDepositAddress, MsgRegisterBtcDepositAddressResponse, MsgRegisterReserveAddress, MsgRegisterReserveAddressResponse, MsgRegisterJudge, MsgRegisterJudgeResponse, MsgWithdrawBtcRequest, MsgWithdrawBtcRequestResponse, MsgSweepProposal, MsgSweepProposalResponse, MsgWithdrawTxSigned, MsgWithdrawTxSignedResponse, MsgWithdrawTxFinal, MsgWithdrawTxFinalResponse, MsgConfirmBtcWithdraw, MsgConfirmBtcWithdrawResponse, MsgSignRefund, MsgSignRefundResponse, MsgBroadcastRefund, MsgBroadcastRefundResponse } from "./tx";
/** Msg defines the Msg service. */

export interface Msg {
  confirmBtcDeposit(request: MsgConfirmBtcDeposit): Promise<MsgConfirmBtcDepositResponse>;
  registerBtcDepositAddress(request: MsgRegisterBtcDepositAddress): Promise<MsgRegisterBtcDepositAddressResponse>;
  registerReserveAddress(request: MsgRegisterReserveAddress): Promise<MsgRegisterReserveAddressResponse>;
  registerJudge(request: MsgRegisterJudge): Promise<MsgRegisterJudgeResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */

  withdrawBtcRequest(request: MsgWithdrawBtcRequest): Promise<MsgWithdrawBtcRequestResponse>;
  sweepProposal(request: MsgSweepProposal): Promise<MsgSweepProposalResponse>;
  withdrawTxSigned(request: MsgWithdrawTxSigned): Promise<MsgWithdrawTxSignedResponse>;
  withdrawTxFinal(request: MsgWithdrawTxFinal): Promise<MsgWithdrawTxFinalResponse>;
  confirmBtcWithdraw(request: MsgConfirmBtcWithdraw): Promise<MsgConfirmBtcWithdrawResponse>;
  signRefund(request: MsgSignRefund): Promise<MsgSignRefundResponse>;
  broadcastRefund(request: MsgBroadcastRefund): Promise<MsgBroadcastRefundResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.confirmBtcDeposit = this.confirmBtcDeposit.bind(this);
    this.registerBtcDepositAddress = this.registerBtcDepositAddress.bind(this);
    this.registerReserveAddress = this.registerReserveAddress.bind(this);
    this.registerJudge = this.registerJudge.bind(this);
    this.withdrawBtcRequest = this.withdrawBtcRequest.bind(this);
    this.sweepProposal = this.sweepProposal.bind(this);
    this.withdrawTxSigned = this.withdrawTxSigned.bind(this);
    this.withdrawTxFinal = this.withdrawTxFinal.bind(this);
    this.confirmBtcWithdraw = this.confirmBtcWithdraw.bind(this);
    this.signRefund = this.signRefund.bind(this);
    this.broadcastRefund = this.broadcastRefund.bind(this);
  }

  confirmBtcDeposit(request: MsgConfirmBtcDeposit): Promise<MsgConfirmBtcDepositResponse> {
    const data = MsgConfirmBtcDeposit.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "ConfirmBtcDeposit", data);
    return promise.then(data => MsgConfirmBtcDepositResponse.decode(new _m0.Reader(data)));
  }

  registerBtcDepositAddress(request: MsgRegisterBtcDepositAddress): Promise<MsgRegisterBtcDepositAddressResponse> {
    const data = MsgRegisterBtcDepositAddress.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "RegisterBtcDepositAddress", data);
    return promise.then(data => MsgRegisterBtcDepositAddressResponse.decode(new _m0.Reader(data)));
  }

  registerReserveAddress(request: MsgRegisterReserveAddress): Promise<MsgRegisterReserveAddressResponse> {
    const data = MsgRegisterReserveAddress.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "RegisterReserveAddress", data);
    return promise.then(data => MsgRegisterReserveAddressResponse.decode(new _m0.Reader(data)));
  }

  registerJudge(request: MsgRegisterJudge): Promise<MsgRegisterJudgeResponse> {
    const data = MsgRegisterJudge.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "RegisterJudge", data);
    return promise.then(data => MsgRegisterJudgeResponse.decode(new _m0.Reader(data)));
  }

  withdrawBtcRequest(request: MsgWithdrawBtcRequest): Promise<MsgWithdrawBtcRequestResponse> {
    const data = MsgWithdrawBtcRequest.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "WithdrawBtcRequest", data);
    return promise.then(data => MsgWithdrawBtcRequestResponse.decode(new _m0.Reader(data)));
  }

  sweepProposal(request: MsgSweepProposal): Promise<MsgSweepProposalResponse> {
    const data = MsgSweepProposal.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "SweepProposal", data);
    return promise.then(data => MsgSweepProposalResponse.decode(new _m0.Reader(data)));
  }

  withdrawTxSigned(request: MsgWithdrawTxSigned): Promise<MsgWithdrawTxSignedResponse> {
    const data = MsgWithdrawTxSigned.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "WithdrawTxSigned", data);
    return promise.then(data => MsgWithdrawTxSignedResponse.decode(new _m0.Reader(data)));
  }

  withdrawTxFinal(request: MsgWithdrawTxFinal): Promise<MsgWithdrawTxFinalResponse> {
    const data = MsgWithdrawTxFinal.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "WithdrawTxFinal", data);
    return promise.then(data => MsgWithdrawTxFinalResponse.decode(new _m0.Reader(data)));
  }

  confirmBtcWithdraw(request: MsgConfirmBtcWithdraw): Promise<MsgConfirmBtcWithdrawResponse> {
    const data = MsgConfirmBtcWithdraw.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "ConfirmBtcWithdraw", data);
    return promise.then(data => MsgConfirmBtcWithdrawResponse.decode(new _m0.Reader(data)));
  }

  signRefund(request: MsgSignRefund): Promise<MsgSignRefundResponse> {
    const data = MsgSignRefund.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "SignRefund", data);
    return promise.then(data => MsgSignRefundResponse.decode(new _m0.Reader(data)));
  }

  broadcastRefund(request: MsgBroadcastRefund): Promise<MsgBroadcastRefundResponse> {
    const data = MsgBroadcastRefund.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.bridge.Msg", "BroadcastRefund", data);
    return promise.then(data => MsgBroadcastRefundResponse.decode(new _m0.Reader(data)));
  }

}