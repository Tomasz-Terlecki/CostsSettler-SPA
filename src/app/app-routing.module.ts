import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { ChargeListComponent } from './components/charges/charge-list/charge-list.component';
import { CircumstanceListComponent } from './components/circumstances/circumstance-list/circumstance-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'charges',
        component: ChargeListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'circumstances',
        component: CircumstanceListComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'charges'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
