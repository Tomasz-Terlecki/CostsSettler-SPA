import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Circumstance } from 'src/app/models/circumstance.model';
import { CircumstancesService } from 'src/app/services/circumstances.service';

@Component({
  selector: 'app-detailed-circumstance',
  templateUrl: './detailed-circumstance.component.html',
  styleUrls: ['./detailed-circumstance.component.scss']
})
export class DetailedCircumstanceComponent implements OnInit {
  circumstance!: Circumstance;
  circumstanceForm!: FormGroup;
  // users: UserForListDto[];

  constructor(private route: ActivatedRoute, 
    private circumstancesService: CircumstancesService, private toastrService: ToastrService
  ) {
    this.setForm();
  }

  ngOnInit() {
    this.getCircumstance();
  }
  
  getCircumstance(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.circumstancesService.getById(id!)
      .subscribe({
        next: (res) => { 
          this.circumstance = res;
        },
        error: (err) => {
          console.error(err); 
          this.toastrService.error('Downloading circumstances failed')
        }
      })
  }

  setForm(): void {
    this.circumstanceForm = new FormGroup({
      description: new FormControl<string>('', Validators.required),
      totalAmount: new FormControl<number>(0, Validators.required),
      date: new FormControl<Date | null>(null, Validators.required),
      time: new FormControl<Date | null>(null, Validators.required),
    })
  }

  save(): void {
    console.log(this.circumstanceForm.value);
  }

}
