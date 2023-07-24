import { Component, Input, OnInit } from '@angular/core';
import { ChargeForListDto } from 'src/app/models/dtos/charge-for-list.dto';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent {
  @Input() charge: ChargeForListDto | undefined;
}
