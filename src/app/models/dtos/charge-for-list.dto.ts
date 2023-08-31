import { ChargeStatus } from "src/app/enums/charge-status.enum";
import { User } from "../user.model";
import { CircumstanceStatus } from "src/app/enums/circumstance.status";

/**
 * DTO representing charge on charge list.
 */
export class ChargeForListDto {
  /** Charge id. */
  id: string;
  /** Charge creditor. */
  creditor: User | undefined;
  /** Charge creditor id. */
  creditorId: string;
  /** Charge debtor. */
  debtor: User | undefined;
  /** Charge debtor id. */
  debtorId: string;
  /** Circumstance description. */
  circumstanceDescription: string;
  /** Circumstance id. */
  circumstanceId: string;
  /** Charge amount. */
  amount: number;
  /** Status of charge. */
  chargeStatus: ChargeStatus;
  /** Status of circumstance. */
  circumstanceStatus: CircumstanceStatus;
  /** Date and time of charge. */
  dateTime: Date | undefined;

  /**
   * Creates new ChargeForListDto instance.
   */
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