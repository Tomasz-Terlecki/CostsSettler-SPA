import { CircumstancesService } from 'src/app/services/circumstances.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CircumstanceForListDto } from 'src/app/models/dtos/circumstance-for-list.dto';
import { ToastrService } from 'ngx-toastr';

/**
 * Component that represents list of circumstances.
 */
@Component({
  selector: 'app-circumstance-list',
  templateUrl: './circumstance-list.component.html',
  styleUrls: ['./circumstance-list.component.scss']
})
export class CircumstanceListComponent implements OnInit {
  /** Circumstances to be displayed. */
  circumstances: Array<CircumstanceForListDto> | undefined;

  /**
   * Creates new CircumstanceListComponent instance.
   * @param circumstancesService Circumstances management service.
   * @param authService Auth management service.
   * @param toastrService Toastr management service.
   */
  constructor(private circumstancesService: CircumstancesService, 
    private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getData();
  }

  /**
   * Downloads circumstances depending on filters - userId.
   */
  getData(): void {
    this.circumstancesService.get({
      userId: this.authService.currentUser?.id
    })
      .subscribe({
        next: (res) => { this.circumstances = res; },
        error: (err) => {
          console.error(err); 
          this.toastrService.error('Downloading circumstances failed')
        }
      })
  }

}
