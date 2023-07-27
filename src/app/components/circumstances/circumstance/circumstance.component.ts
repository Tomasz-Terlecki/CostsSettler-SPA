import { Component, Input } from '@angular/core';
import { CircumstanceStatus } from 'src/app/enums/circumstance.status';
import { CircumstanceForListDto } from 'src/app/models/dtos/circumstance-for-list.dto';

@Component({
  selector: 'app-circumstance',
  templateUrl: './circumstance.component.html',
  styleUrls: ['./circumstance.component.scss']
})
export class CircumstanceComponent {
  @Input() circumstance!: CircumstanceForListDto;

  constructor() { }

  viewCircumstance(): void {
    // TODO
  }

  setCardClass(): any {
    return {
      'border-color-rejected': this.circumstance.circumstanceStatus === CircumstanceStatus.Rejected,
      'border-color-settled': this.circumstance.circumstanceStatus === CircumstanceStatus.Settled
    };
  }

  setCardHeaderClass(): any {
    return {
      'background-rejected': this.circumstance.circumstanceStatus === CircumstanceStatus.Rejected,
      'background-settled': this.circumstance.circumstanceStatus === CircumstanceStatus.Settled
    };
  }
}
