import { CircumstanceStatus } from "../enums/circumstance.status";
import { Charge } from "./charge.model";
import { User } from "./user.model";

export class Circumstance {
  id: string;
  description: string;
  totalAmount: number;
  charges: Array<Charge> | undefined;
  circumstanceStatus: CircumstanceStatus;
  debtors: Array<User> | undefined;
  creditor: User | undefined;
  
  constructor() {
    this.id = '';
    this.description = '';
    this.totalAmount = 0;
    this.circumstanceStatus = CircumstanceStatus.None;
  }
}