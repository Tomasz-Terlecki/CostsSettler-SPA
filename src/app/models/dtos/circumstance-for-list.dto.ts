import { CircumstanceStatus } from "src/app/enums/circumstance.status";

export class CircumstanceForListDto {
  id: string;
  description: string;
  totalAmount: number;
  circumstanceStatus: CircumstanceStatus;
  dateTime: Date | undefined;

  constructor() {
    this.id = '';
    this.description = '';
    this.totalAmount = 0;
    this.circumstanceStatus = CircumstanceStatus.None;
  }
}