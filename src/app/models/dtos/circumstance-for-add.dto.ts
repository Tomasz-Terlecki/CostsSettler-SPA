/**
 * DTO representing circumstance for add.
 */
export class CircumstanceForAddDto {
  /** Circumstance description. */
  description: string;
  /** Circumstance amount. */
  totalAmount: number;
  /** Circumstance date. */
  date: Date;
  /** Circumstance time. */
  time: Date;
  /** Circumstance debtors ids. */
  debtorsIds: string[];
  /** Circumstance creditor id. */
  creditorId: string;

  /** Creates new CircumstanceForAddDto instance. */
  constructor() {
    this.description = '';
    this.totalAmount = 0;
    this.date = new Date();
    this.time = new Date();
    this.debtorsIds = [];
    this.creditorId = '';
  }
}