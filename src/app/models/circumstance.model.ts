import { CircumstanceStatus } from "../enums/circumstance.status";
import { BaseModel } from "./base.model";
import { Charge } from "./charge.model";
import { User } from "./user.model";

export class Circumstance extends BaseModel{
  description: string;
  totalAmount: number;
  charges: Array<Charge> | undefined;
  circumstanceStatus: CircumstanceStatus;
  debtors: Array<User> | undefined;
  creditor: User | undefined;
  dateTime: Date | undefined;
  
  constructor() {
    super();
    this.description = '';
    this.totalAmount = 0;
    this.circumstanceStatus = CircumstanceStatus.None;
  }
}