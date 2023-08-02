import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Circumstance } from 'src/app/models/circumstance.model';
import { UserForListDto } from 'src/app/models/dtos/user-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';
import { CircumstancesService } from 'src/app/services/circumstances.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-detailed-circumstance',
  templateUrl: './detailed-circumstance.component.html',
  styleUrls: ['./detailed-circumstance.component.scss']
})
export class DetailedCircumstanceComponent implements OnInit {
  circumstance!: Circumstance;
  circumstanceForm!: FormGroup;
  users!: UserForListDto[];
  selectedDebtors: UserForListDto[] = [];

  constructor(private route: ActivatedRoute, private circumstancesService: CircumstancesService,
    private toastrService: ToastrService, private usersService: UsersService, private authService: AuthService
  ) {
    this.setForm();
  }

  ngOnInit() {
    this.getCircumstance();
    this.getUsers();
  }
  
  getCircumstance(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.circumstancesService.getById(id!)
      .subscribe({
        next: (res) => { 
          this.circumstance = res;
          this.setCircumstanceInForm(res);
        },
        error: (err) => {
          console.error(err); 
          this.toastrService.error('Downloading circumstances failed');
        }
      })
  }

  getUsers(): void {
    this.usersService.get({})
      .subscribe({
        next: (res) => {
          this.users = res;
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Downloading users failed');
        }
      });
  }

  setForm(): void {
    this.circumstanceForm = new FormGroup({
      description: new FormControl<string>('', Validators.required),
      totalAmount: new FormControl<number>(0, Validators.required),
      date: new FormControl<Date | null>(null, Validators.required),
      time: new FormControl<Date | null>(null, Validators.required),
    })
  }

  setCircumstanceInForm(circumstance: Circumstance): void {
    this.circumstanceForm.controls['description'].setValue(circumstance.description);
    this.circumstanceForm.controls['totalAmount'].setValue(circumstance.totalAmount);
    this.circumstanceForm.controls['date'].setValue(circumstance.dateTime);
    this.circumstanceForm.controls['time'].setValue(circumstance.dateTime);
    if (circumstance.debtors) {
      for (let debtor of circumstance.debtors) {
        this.addDebtor(debtor.id);
      }
      const loggedUsersIndex = this.users
        .findIndex(user => user.id === this.authService.currentUser?.id);
      this.users.splice(loggedUsersIndex, 1);
    }
  }

  debtorSelected(event: any) {
    const userId = event.target.value;
    this.addDebtor(userId);
  }

  addDebtor(userId: string) {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      this.selectedDebtors.push(user);
      const indexToDelete = this.users.findIndex(u => u.id === user.id)
      this.users.splice(indexToDelete, 1);
    }
  }

  removeDebtor(userId: string) {
    const indexToDelete = this.selectedDebtors.findIndex(user => user.id == userId);
    const user = this.selectedDebtors[indexToDelete];
    this.users.push(user);
    this.selectedDebtors.splice(indexToDelete, 1);
  }

  save(): void {
    console.log(this.circumstanceForm.value);
  }

}
