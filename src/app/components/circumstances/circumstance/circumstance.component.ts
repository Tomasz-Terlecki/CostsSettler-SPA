import { Component, Input } from '@angular/core';
import { CircumstanceStatus } from 'src/app/enums/circumstance.status';
import { CircumstanceForListDto } from 'src/app/models/dtos/circumstance-for-list.dto';

/**
 * Component that represents single circumstance on circumstance list.
 */
@Component({
  selector: 'app-circumstance',
  templateUrl: './circumstance.component.html',
  styleUrls: ['./circumstance.component.scss']
})
export class CircumstanceComponent {
  /** Circumstance to display. */
  @Input() circumstance!: CircumstanceForListDto;

  /**
   * Creates new CircumstanceComponent instance
   */
  constructor() { }

  /**
   * Sets border class for component, depending on circumstance status.
   * @returns object with classes to be set or not.
   */
  setCardClass(): any {
    return {
      'border-color-rejected': this.circumstance.circumstanceStatus === CircumstanceStatus.Rejected,
      'border-color-settled': this.circumstance.circumstanceStatus === CircumstanceStatus.Settled
    };
  }

  /**
   * Sets background class for component, depending on circumstance status.
   * @returns object with classes to be set or not.
   */
  setCardHeaderClass(): any {
    return {
      'background-rejected': this.circumstance.circumstanceStatus === CircumstanceStatus.Rejected,
      'background-settled': this.circumstance.circumstanceStatus === CircumstanceStatus.Settled
    };
  }
}
