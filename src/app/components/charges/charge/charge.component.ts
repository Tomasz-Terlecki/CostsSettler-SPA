import { Component, Input } from '@angular/core';
import { CircumstanceStatus } from 'src/app/enums/circumstance.status';
import { ChargeForListDto } from 'src/app/models/dtos/charge-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent {
  @Input() charge: ChargeForListDto | undefined;

  constructor(private authService: AuthService) {}
  
  isVoteEnabled(): boolean {
    return this.charge?.debtorId === this.authService.currentUser?.id;
  }

  isSettleEnabled(): boolean {
    return this.charge?.circumstanceStatus === CircumstanceStatus.Accepted
      && this.charge?.creditorId === this.authService.currentUser?.id;
  }
}
