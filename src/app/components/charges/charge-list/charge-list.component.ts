import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChargeStatus } from 'src/app/enums/charge-status.enum';
import { ChargeForListDto } from 'src/app/models/dtos/charge-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ChargesService } from 'src/app/services/charges.service';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.scss']
})
export class ChargeListComponent implements OnInit {
  charges: Array<ChargeForListDto> | undefined;
  filterForm!: FormGroup;

  constructor(private chargesService: ChargesService, 
      private authService: AuthService, private toastrService: ToastrService
  ) {
    this.setForm();
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    let params = this.filterForm.value;
    this.chargesService.get({
      userId: this.authService.currentUser?.id,
      dateFrom: params['dateFrom'],
      dateTo: params['dateTo']
    })
      .subscribe({
        next: (res) => { this.charges = res; },
        error: (err) => { 
          console.error(err);
          this.toastrService.error('Downloading charges failed')
        }
      });
  }

  setForm(): void {
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 10);

    const dateTo = new Date();

    this.filterForm = new FormGroup({
      chargeStatus: new FormControl<ChargeStatus | null>(null, Validators.required),
      dateFrom: new FormControl<string>(formatDate(dateFrom, 'yyyy-MM-dd', 'en'), Validators.required),
      dateTo: new FormControl<string>(formatDate(dateTo, 'yyyy-MM-dd', 'en'), Validators.required),
      circumstanceDescription: new FormControl<string | null>(null, Validators.required),
    })
  }

}
