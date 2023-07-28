import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { ChargeListComponent } from './components/charges/charge-list/charge-list.component';
import { CircumstanceListComponent } from './components/circumstances/circumstance-list/circumstance-list.component';
import { DetailedCircumstanceComponent } from './components/circumstances/detailed-circumstance/detailed-circumstance.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'circumstances',
        pathMatch: 'full'
      },
      {
        path: 'charges',
        component: ChargeListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'circumstances',
        component: CircumstanceListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'circumstance/:id',
        component: DetailedCircumstanceComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'circumstances'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
