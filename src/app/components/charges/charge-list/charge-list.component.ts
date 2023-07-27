import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private chargesService: ChargesService, 
    private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.chargesService.get({
      userId: this.authService.currentUser?.id
    })
      .subscribe({
        next: (res) => { this.charges = res; },
        error: (err) => { 
          console.error(err);
          this.toastrService.error('Downloading charges failed')
        }
      });
  }

}
