import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChargeStatus } from 'src/app/enums/charge-status.enum';
import { ChargeForListDto } from 'src/app/models/dtos/charge-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ChargesService } from 'src/app/services/charges.service';

/**
 * Component that represents list of charges.
 */
@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.scss']
})
export class ChargeListComponent implements OnInit {
  /** Charges to be displayed. */
  charges: Array<ChargeForListDto> | undefined;
  /** Filters to apply while downloading charges */
  filterForm!: FormGroup;

  /**
   * Creates new ChargeListComponent instance.
   * @param chargesService Charges management service.
   * @param authService Auth management service.
   * @param toastrService Toastr management service.
   */
  constructor(private chargesService: ChargesService, 
      private authService: AuthService, private toastrService: ToastrService
  ) {
    this.setForm();
  }

  ngOnInit() {
    this.getData();
  }

  /**
   * Downloads charges depending on filters.
   */
  getData(): void {
    this.chargesService.get(this.createParams())
      .subscribe({
        next: (res) => { this.charges = res; },
        error: (err) => { 
          console.error(err);
          this.toastrService.error('Downloading charges failed')
        }
      });
  }

  /**
   * Sets new form data on component initializing.
   */
  setForm(): void {
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 10);

    const dateTo = new Date();

    this.filterForm = new FormGroup({
      dateFrom: new FormControl<string>(formatDate(dateFrom, 'yyyy-MM-dd', 'en'), Validators.required),
      dateTo: new FormControl<string>(formatDate(dateTo, 'yyyy-MM-dd', 'en'), Validators.required),
      amountFrom: new FormControl<number | null>(null, Validators.required),
      amountTo: new FormControl<number | null>(null, Validators.required),
      circumstanceDescription: new FormControl<string | null>(null, Validators.required),
    })
  }

  private createParams(): {} {
    const formValue = this.filterForm.value;

    let params: any = {};
    params.userId = this.authService.currentUser?.id;
    params.dateFrom = formValue['dateFrom'];
    params.dateTo = formValue['dateTo'];

    if (formValue['amountFrom'] !== null) {
      params.amountFrom = formValue['amountFrom'];
    }
    if (formValue['amountTo'] !== null) {
      params.amountTo = formValue['amountTo'];
    }
    if (formValue['circumstanceDescription'] !== null) {
      params.circumstanceDescription = formValue['circumstanceDescription'];
    }

    return params;
  }

}
