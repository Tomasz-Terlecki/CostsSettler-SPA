import { ChargeStatus } from "src/app/enums/charge-status.enum";
import { User } from "../user.model";

export class ChargeForListDto {
  creditor: User | undefined;
  creditorId: string;
  debtor: User | undefined;
  debtorId: string;
  circumstanceDescription: string;
  circumstanceId: string;
  amount: number;
  chargeStatus: ChargeStatus;

  constructor () {
    this.creditorId = '';
    this.debtorId = '';
    this.circumstanceId = '';
    this.circumstanceDescription = '';
    this.amount = 0;
    this.chargeStatus = ChargeStatus.None;
  }
}