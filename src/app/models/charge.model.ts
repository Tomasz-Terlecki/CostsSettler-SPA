import { ChargeStatus } from "../enums/charge-status.enum";
import { BaseModel } from "./base.model";
import { Circumstance } from "./circumstance.model";
import { User } from "./user.model";

/**
 * Represents charge domain model.
 */
export class Charge extends BaseModel {
  /** Charge creditor. */
  creditor: User | undefined;
  /** Charge creditor id. */
  creditorId: string;
  /** Charge debtor. */
  debtor: User | undefined;
  /** Charge debtor id. */
  debtorId: string;
  /** Circumstance for charge. */
  circumstance: Circumstance | undefined;
  /** Circumstance id. */
  circumstanceId: string;
  /** Charge amount. */
  amount: number;
  /** Status for charge. */
  chargeStatus: ChargeStatus;
  /** Charge date and time. */
  dateTime: Date | undefined;

  /**
   * Creates new charge model instance.
   */
  constructor () {
    super();
    this.creditorId = '';
    this.debtorId = '';
    this.circumstanceId = '';
    this.amount = 0;
    this.chargeStatus = ChargeStatus.None;
  }
}