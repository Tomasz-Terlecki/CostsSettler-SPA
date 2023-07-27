import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChargeStatus } from 'src/app/enums/charge-status.enum';
import { ChargeVote } from 'src/app/enums/charge-vote.enum';
import { CircumstanceStatus } from 'src/app/enums/circumstance.status';
import { ChargeForListDto } from 'src/app/models/dtos/charge-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ChargesService } from 'src/app/services/charges.service';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent {
  @Input() charge!: ChargeForListDto;
  @Output() chargeChanged = new EventEmitter<void>();

  constructor(
    private authService: AuthService, 
    private chargesService: ChargesService,
    private toastrService: ToastrService) {}
  
  get isVoteEnabled(): boolean {
    if (this.charge.chargeStatus === ChargeStatus.Settled ||
        this.charge.circumstanceStatus === CircumstanceStatus.PartiallySettled ||
        this.charge.circumstanceStatus === CircumstanceStatus.Settled) {
      return false;
    }
    
    return this.charge.debtorId === this.authService.currentUser?.id;
  }

  get isSettleEnabled(): boolean {
    if (this.charge.chargeStatus !== ChargeStatus.Accepted ||
        this.charge.circumstanceStatus !== CircumstanceStatus.Accepted && 
        this.charge.circumstanceStatus !== CircumstanceStatus.PartiallySettled) {
      return false;
    }
    return this.charge.creditorId === this.authService.currentUser?.id;
  }

  acceptCharge(): void {
    this.chargesService.voteForCharge(this.charge.id, ChargeVote.Accept)
      .subscribe({
        next: (res) => {
          if (res){
            this.chargeChanged.emit();
            this.toastrService.success('Charge accepted successfully')
          }
        },
        error: (err) => { 
          console.error(err);
          this.toastrService.error('Accepting charge failed')
        }
      });
  }
  
  rejectCharge(): void {
    this.chargesService.voteForCharge(this.charge.id, ChargeVote.Reject)
      .subscribe({
        next: (res) => {
          if (res){
            this.chargeChanged.emit();
            this.toastrService.success('Charge rejected successfully')
          }
        },
        error: (err) => { 
          console.error(err);
          this.toastrService.error('Accepting charge failed')
        }
      });
  }

  settleCharge(): void {
    this.chargesService.settleCharge(this.charge.id)
      .subscribe({
        next: (res) => {
          if (res){
            this.chargeChanged.emit();
            this.toastrService.success('Charge settled successfully')
          }
        },
        error: (err) => { 
          console.error(err); 
          this.toastrService.error('Settling charge failed')
        }
      });
  }
}
