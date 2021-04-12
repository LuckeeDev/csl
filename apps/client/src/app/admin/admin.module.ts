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

import { CommissioniComponent } from './components/commissioni/commissioni.component';
import { ServiceAccountView } from './views/service-account/service-account.view';
import { CourseDetailsView } from './views/course-details/course-details.view';
import { ManageSectionsComponent } from './views/manage-sections/manage-sections.component';
import { NgxsModule } from '@ngxs/store';
import { PlatformState } from '@/global/store/platform';

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
		ServiceAccountView,
		CourseDetailsView,
		ManageSectionsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AdminRoutingModule,
		UiModule,
		SharedModule,
		NgxsModule.forFeature([PlatformState]),
	],
	providers: [AdminService],
})
export class AdminModule {}
