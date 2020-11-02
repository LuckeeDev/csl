// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarAdminRoutingModule } from './bar-admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Store
import { NgxsModule } from '@ngxs/store';
import { OrdersState } from '@bar-admin/store';

// UI
import { UiModule } from '@global/ui/ui.module';

// Main page
import { BarAdminComponent } from '@bar-admin/bar-admin.component';

// Sub-components
import { BarHomeComponent } from '@bar-admin/components/bar-home/bar-home.component';
import { ManageComponent } from '@bar-admin/components/manage/manage.component';
import { CreateSnackComponent } from '@bar-admin/components/create-snack/create-snack.component';
import { SnackOrdersComponent } from './components/snack-orders/snack-orders.component';
import { SnackSingleClassComponent } from './components/snack-single-class/snack-single-class.component';

// Shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    BarAdminComponent,
    BarHomeComponent,
    ManageComponent,
    CreateSnackComponent,
    SnackOrdersComponent,
    SnackSingleClassComponent,
  ],
  imports: [
    CommonModule,
    BarAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UiModule,
    SharedModule,
    NgxsModule.forFeature([OrdersState]),
  ],
})
export class BarAdminModule {}
