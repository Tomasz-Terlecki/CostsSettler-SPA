import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { ChargeListComponent } from './components/charges/charge-list/charge-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ChargeListComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
