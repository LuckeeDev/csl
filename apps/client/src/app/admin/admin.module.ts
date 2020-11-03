import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminComponent } from './admin.component';

import { UiModule } from '@csl/ui';

import { SharedModule } from '@shared/shared.module';

import { AdminHomeComponent } from '@admin/components/admin-home/admin-home.component';
import { AccountsComponent } from '@admin/components/accounts/accounts.component';

import { AdminService } from '@admin/services/admin/admin.service';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent, AccountsComponent, ReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    UiModule,
    SharedModule,
  ],
  providers: [AdminService],
})
export class AdminModule {}
