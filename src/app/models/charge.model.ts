import { ChargeStatus } from "../enums/charge-status.enum";
import { Circumstance } from "./circumstance.model";
import { User } from "./user.model";

export class Charge {
  id: string;
  creditor: User | undefined;
  creditorId: string;
  debtor: User | undefined;
  debtorId: string;
  circumstance: Circumstance | undefined;
  circumstanceId: string;
  amount: number;
  chargeStatus: ChargeStatus;

  constructor () {
    this.id = '';
    this.creditorId = '';
    this.debtorId = '';
    this.circumstanceId = '';
    this.amount = 0;
    this.chargeStatus = ChargeStatus.None;
  }
}