import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Circumstance } from 'src/app/models/circumstance.model';
import { CircumstanceForAddDto } from 'src/app/models/dtos/circumstance-for-add.dto';
import { UserForListDto } from 'src/app/models/dtos/user-for-list.dto';
import { AuthService } from 'src/app/services/auth.service';
import { CircumstancesService } from 'src/app/services/circumstances.service';
import { UsersService } from 'src/app/services/users.service';

/**
 * Component that represents circumstance with details.
 */
@Component({
  selector: 'app-detailed-circumstance',
  templateUrl: './detailed-circumstance.component.html',
  styleUrls: ['./detailed-circumstance.component.scss']
})
export class DetailedCircumstanceComponent implements OnInit {
  /** Mode of component. */
  mode: 'add'|'read' = 'read';
  /** Circumstance to display. */
  circumstance!: Circumstance;
  /** Form of circumstance. */
  circumstanceForm!: FormGroup;
  /** Users list for dropdown. */
  users: UserForListDto[] = [];
  /** Debtors selected. */
  selectedDebtors: UserForListDto[] = [];

  /** Is form readonly or modifiable. */
  get readonly() {
    return this.mode === 'read';
  }

  /**
   * Creates new DetailedCircumstanceComponent instance
   * @param router Angular router.
   * @param route Angular route representation.
   * @param circumstancesService Circumstances management service.
   * @param toastrService Toastr management service.
   * @param usersService Users management service.
   * @param authService Auth management service.
   */
  constructor(private router: Router, private route: ActivatedRoute, private circumstancesService: CircumstancesService,
    private toastrService: ToastrService, private usersService: UsersService, private authService: AuthService
  ) {
    this.setForm();
    this.mode = route.toString().includes('00000000-0000-0000-0000-000000000000')
      ? 'add'
      : 'read';
  }

  ngOnInit() {
    this.getData();
  }
  
  /**
   * Gets circumstance to display and saves in 'circumstance'.
   */
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
          this.toastrService.error('Downloading circumstance failed');
        }
      })
  }

  /**
   * Gets data from database.
   */
  getData(): void {
    this.usersService.get({})
      .subscribe({
        next: (res) => {
          this.users = res;
          const loggedUserIndex = this.users
            .findIndex(user => user.id === this.authService.currentUser?.id);
          this.users.splice(loggedUserIndex, 1);

          if (this.mode === 'read') {
            this.getCircumstance();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Downloading users failed');
        }
      });
  }

  /**
   * Debtor is selected.
   * @param event Representation of selected debtor.
   */
  debtorSelected(event: any) {
    const userId = event.target.value;
    this.addDebtor(userId);
  }

  /**
   * Debtor is removed. Removes debtor from selected debtors list.
   * @param userId Debtor id to remove from list.
   */
  removeDebtor(userId: string) {
    const indexToDelete = this.selectedDebtors.findIndex(user => user.id == userId);
    const user = this.selectedDebtors[indexToDelete];
    this.users.push(user);
    this.selectedDebtors.splice(indexToDelete, 1);
  }

  /**
   * Maps form to circumstance and creates new.
   */
  addCircumstance(): void {
    const circumstance = this.getFromForm();
    this.circumstancesService.add(circumstance)
      .subscribe({
        next: () => {
          this.toastrService.success('Circumstance adding succeeded');
          this.router.navigate(['/circumstances']);
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Circumstance adding failed');
        }
      })
  }

  private setForm(): void {
    this.circumstanceForm = new FormGroup({
      description: new FormControl<string>('', Validators.required),
      totalAmount: new FormControl<number>(0, Validators.required),
      date: new FormControl<Date | null>(null, Validators.required),
      time: new FormControl<Date | null>(null, Validators.required),
    })
  }

  private setCircumstanceInForm(circumstance: Circumstance): void {
    this.circumstanceForm.controls['description'].setValue(circumstance.description);
    this.circumstanceForm.controls['totalAmount'].setValue(circumstance.totalAmount);
    this.circumstanceForm.controls['date'].setValue(formatDate(circumstance.dateTime, 'yyyy-MM-dd', 'en'));
    this.circumstanceForm.controls['time'].setValue(formatDate(circumstance.dateTime, 'HH:mm', 'en'));
    if (circumstance.debtors) {
      for (let debtor of circumstance.debtors) {
        this.addDebtor(debtor.id);
      }
      const loggedUserIndex = this.users
        .findIndex(user => user.id === this.authService.currentUser?.id);
      this.users.splice(loggedUserIndex, 1);
    }

    if (this.readonly) {
      this.circumstanceForm.controls['description'].disable();
      this.circumstanceForm.controls['totalAmount'].disable();
      this.circumstanceForm.controls['date'].disable();
      this.circumstanceForm.controls['time'].disable();
    }
  }

  private getFromForm(): CircumstanceForAddDto {
    let circumstance = this.circumstanceForm.value as CircumstanceForAddDto;
    circumstance.debtorsIds = this.selectedDebtors.map(debtor => debtor.id);

    if (this.authService.currentUser) {
      circumstance.creditorId = this.authService.currentUser.id;
    }

    return circumstance;
  }

  private addDebtor(userId: string) {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      this.selectedDebtors.push(user);
      const indexToDelete = this.users.findIndex(u => u.id === user.id)
      this.users.splice(indexToDelete, 1);
    }
  }

}
