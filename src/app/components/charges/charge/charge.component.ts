import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChargeStatus } from 'src/app/enums/charge-status.enum';
import { ChargeVote } from 'src/app/enums/charge-vote.enum';
import { CircumstanceStatus } from 'src/app/enums/circumstance.status';
import { ChargeForListDto } from 'src/app/models/dtos/charge-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ChargesService } from 'src/app/services/charges.service';

/**
 * Component that represents single charge on charge list.
 */
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent {
  /** Charge to display. */
  @Input() charge!: ChargeForListDto;
  /** Event sent when charge is changed. */
  @Output() chargeChanged = new EventEmitter<void>();

  /**
   * Creates new ChargeComponent instance.
   * @param authService Auth management service.
   * @param chargesService Charges management service.
   * @param toastrService Toastr management service.
   */
  constructor(
    private authService: AuthService, 
    private chargesService: ChargesService,
    private toastrService: ToastrService) {}
  
  /** Returns information if voting is enabled. */
  get isVoteEnabled(): boolean {
    if (this.charge.chargeStatus === ChargeStatus.Settled ||
        this.charge.circumstanceStatus === CircumstanceStatus.PartiallySettled ||
        this.charge.circumstanceStatus === CircumstanceStatus.Settled) {
      return false;
    }
    
    return this.charge.debtorId === this.authService.currentUser?.id;
  }

  /** Returns information if settling charge is enabled. */
  get isSettleEnabled(): boolean {
    if (this.charge.chargeStatus !== ChargeStatus.Accepted ||
        this.charge.circumstanceStatus !== CircumstanceStatus.Accepted && 
        this.charge.circumstanceStatus !== CircumstanceStatus.PartiallySettled) {
      return false;
    }
    return this.charge.creditorId === this.authService.currentUser?.id;
  }

  /**
   * Accepts charge, creates appropriate toastr.
   */
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
  
  /**
   * Rejects charge, creates appropriate toastr.
   */
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
          this.toastrService.error('Rejecting charge failed')
        }
      });
  }

  /**
   * Settles charge, creates appropriate toastr.
   */
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

  /**
   * Sets border class for component, depending on charge status.
   * @returns object with classes to be set or not.
   */
  setCardClass(): any {
    return {
      'border-color-rejected': this.charge.chargeStatus === ChargeStatus.Rejected,
      'border-color-settled': this.charge.chargeStatus === ChargeStatus.Settled
    };
  }

  /**
   * Sets background class for component, depending on charge status.
   * @returns object with classes to be set or not.
   */
  setCardHeaderClass(): any {
    return {
      'background-rejected': this.charge.chargeStatus === ChargeStatus.Rejected,
      'background-settled': this.charge.chargeStatus === ChargeStatus.Settled
    };
  }
}
