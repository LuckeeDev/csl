// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { BarAdminComponent } from '@bar-admin/bar-admin.component';

// Sub-components
import { BarHomeComponent } from '@bar-admin/components/bar-home/bar-home.component';
import { ManageComponent } from '@bar-admin/components/manage/manage.component';
import { CreateSnackComponent } from '@bar-admin/components/create-snack/create-snack.component';
import { SnackOrdersComponent } from '@bar-admin/components/snack-orders/snack-orders.component';
import { SnackSingleClassComponent } from '@bar-admin/components/snack-single-class/snack-single-class.component';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';

const routes: Routes = [
  {
    path: '',
    component: BarAdminComponent,
    children: [
      { path: '', component: BarHomeComponent },
      { path: 'orders', component: SnackOrdersComponent },
      { path: 'orders/:classID', component: SnackSingleClassComponent },
      { path: 'classi', component: ClassiComponent },
      { path: 'classi/:classID', component: SingleClassComponent },
      { path: 'manage', component: ManageComponent },
      { path: 'manage/create', component: CreateSnackComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarAdminRoutingModule {}
