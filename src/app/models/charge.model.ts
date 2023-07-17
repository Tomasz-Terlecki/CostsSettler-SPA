import { ChargeStatus } from "../enums/charge-status.enum";
import { BaseModel } from "./base.model";
import { Circumstance } from "./circumstance.model";
import { User } from "./user.model";

export class Charge extends BaseModel {
  creditor: User | undefined;
  creditorId: string;
  debtor: User | undefined;
  debtorId: string;
  circumstance: Circumstance | undefined;
  circumstanceId: string;
  amount: number;
  chargeStatus: ChargeStatus;

  constructor () {
    super();
    this.creditorId = '';
    this.debtorId = '';
    this.circumstanceId = '';
    this.amount = 0;
    this.chargeStatus = ChargeStatus.None;
  }
}