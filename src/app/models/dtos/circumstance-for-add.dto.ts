export class CircumstanceForAddDto {
  description: string;
  totalAmount: number;
  date: Date;
  time: Date;
  debtorsIds: string[];
  creditorId: string;

  constructor() {
    this.description = '';
    this.totalAmount = 0;
    this.date = new Date();
    this.time = new Date();
    this.debtorsIds = [];
    this.creditorId = '';
  }
}