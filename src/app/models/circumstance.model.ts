import { CircumstanceStatus } from "../enums/circumstance.status";
import { BaseModel } from "./base.model";
import { Charge } from "./charge.model";
import { User } from "./user.model";

/**
 * Represents circumstance domain model.
 */
export class Circumstance extends BaseModel{
  /** Circumstance description. */
  description: string;
  /** Circumstance amount. */
  totalAmount: number;
  /** Charges for circumstance. */
  charges: Array<Charge> | undefined;
  /** Circumstance status. */
  circumstanceStatus: CircumstanceStatus;
  /** Debtors of circumstance. */
  debtors: Array<User> | undefined;
  /** Circumstance creditor. */
  creditor: User | undefined;
  /** Circumstance date and time. */
  dateTime: Date;
  
  /**
   * Creates new instance of circumstance model.
   */
  constructor() {
    super();
    this.description = '';
    this.totalAmount = 0;
    this.circumstanceStatus = CircumstanceStatus.None;
    this.dateTime = new Date();
  }
}