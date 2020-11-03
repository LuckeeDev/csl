// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { AdminComponent } from '@admin/admin.component';

// Components
import { AdminHomeComponent } from '@admin/components/admin-home/admin-home.component';
import { AccountsComponent } from '@admin/components/accounts/accounts.component';
import { ReportsComponent } from './components/reports/reports.component';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';
import { CsvComponent } from '@shared/components/csv/csv.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      {
        path: 'classi',
        children: [
          { path: '', component: ClassiComponent },
          { path: ':classID', component: SingleClassComponent },
        ],
      },
      { path: 'accounts', component: AccountsComponent },
      { path: 'csv', component: CsvComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
