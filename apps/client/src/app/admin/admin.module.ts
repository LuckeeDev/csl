import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminComponent } from './admin.component';

import { UiModule } from '@global/ui/ui.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent, AccountsComponent],
  imports: [CommonModule, AdminRoutingModule, UiModule],
})
export class AdminModule {}
