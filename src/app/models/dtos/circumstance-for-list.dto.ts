import { CircumstanceStatus } from "src/app/enums/circumstance.status";

/**
 * DTO representing circumstance for list.
 */
export class CircumstanceForListDto {
  /** Circumstance id. */
  id: string;
  /** Circumstance description. */
  description: string;
  /** Circumstance amount. */
  totalAmount: number;
  /** Status of circumstance. */
  circumstanceStatus: CircumstanceStatus;
  /** Circumstance date and time. */
  dateTime: Date | undefined;

  /**
   * Creates new instance of CircumstanceForListDto.
   */
  constructor() {
    this.id = '';
    this.description = '';
    this.totalAmount = 0;
    this.circumstanceStatus = CircumstanceStatus.None;
  }
}