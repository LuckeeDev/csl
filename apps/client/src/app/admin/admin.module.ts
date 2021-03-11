import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminComponent } from './admin.component';

import { UiModule } from '@csl/ui';

import { SharedModule } from '@shared/shared.module';

import { AdminHomeComponent } from '@admin/components/admin-home/admin-home.component';
import { AccountsComponent } from '@admin/components/accounts/accounts.component';
import { ReportsComponent } from '@admin/components/reports/reports.component';
import { LogsComponent } from './components/logs/logs.component';
import { CreateCourseComponent } from '@/admin/components/create-course/create-course.component';
import { CogeComponent } from '@/admin/components/coge/coge.component';

import { AdminService } from '@admin/services/admin/admin.service';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlIT } from '@admin/i18n/paginator';
import { CommissioniComponent } from './components/commissioni/commissioni.component';

@NgModule({
	declarations: [
		AdminComponent,
		AdminHomeComponent,
		AccountsComponent,
		ReportsComponent,
		LogsComponent,
		CommissioniComponent,
		CreateCourseComponent,
		CogeComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AdminRoutingModule,
		UiModule,
		SharedModule,
	],
	providers: [
		AdminService,
		{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlIT },
	],
})
export class AdminModule {}
