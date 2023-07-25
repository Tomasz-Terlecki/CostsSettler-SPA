import { ChargeStatus } from "src/app/enums/charge-status.enum";
import { User } from "../user.model";
import { CircumstanceStatus } from "src/app/enums/circumstance.status";

export class ChargeForListDto {
  id: string;
  creditor: User | undefined;
  creditorId: string;
  debtor: User | undefined;
  debtorId: string;
  circumstanceDescription: string;
  circumstanceId: string;
  amount: number;
  chargeStatus: ChargeStatus;
  circumstanceStatus: CircumstanceStatus;
  dateTime: Date | undefined;

  constructor () {
    this.id = '';
    this.creditorId = '';
    this.debtorId = '';
    this.circumstanceId = '';
    this.circumstanceDescription = '';
    this.amount = 0;
    this.chargeStatus = ChargeStatus.None;
    this.circumstanceStatus = CircumstanceStatus.None;
  }
}