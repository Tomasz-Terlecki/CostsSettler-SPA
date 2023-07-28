import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private circumstancesService: CircumstancesService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.getCircumstance();
  }
  
  getCircumstance() {
    const id = this.route.snapshot.paramMap.get('id');
    this.circumstancesService.getById(id!)
      .subscribe({
        next: (res) => { this.circumstance = res; },
        error: (err) => {
          console.error(err); 
          this.toastrService.error('Downloading circumstances failed')
        }
      })
    
  }

}
