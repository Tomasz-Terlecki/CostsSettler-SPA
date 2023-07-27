import { CircumstanceStatus } from "src/app/enums/circumstance.status";
import { User } from "../user.model";

export class CircumstanceForListDto {
  id: string;
  description: string;
  totalAmount: number;
  circumstanceStatus: CircumstanceStatus;
  creditor: User | undefined;
  creditorId: string;
  dateTime: Date | undefined;

  constructor() {
    this.id = '';
    this.description = '';
    this.totalAmount = 0;
    this.creditorId = '';
    this.circumstanceStatus = CircumstanceStatus.None;
  }
}