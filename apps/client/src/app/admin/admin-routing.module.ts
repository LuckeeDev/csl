// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { AdminComponent } from '@admin/admin.component';

// Components
import { AdminHomeComponent } from '@admin/components/admin-home/admin-home.component';
import { AccountsComponent } from '@admin/components/accounts/accounts.component';
import { ReportsComponent } from '@admin/components/reports/reports.component';
import { LogsComponent } from '@admin/components/logs/logs.component';
import { CreateCourseComponent } from '@/admin/components/create-course/create-course.component';
import { CogeComponent } from '@/admin/components/coge/coge.component';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';
import { CsvComponent } from '@shared/components/csv/csv.component';
import { CommissioniComponent } from './components/commissioni/commissioni.component';

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
			{ path: 'commissioni', component: CommissioniComponent },
			{ path: 'csv', component: CsvComponent },
			{ path: 'reports', component: ReportsComponent },
			{ path: 'errors', component: LogsComponent },
			{ path: 'events', component: LogsComponent },
			{ path: 'coge', component: CogeComponent },
			{ path: 'coge/create', component: CreateCourseComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
