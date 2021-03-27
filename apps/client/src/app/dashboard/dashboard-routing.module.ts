// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { DashboardComponent } from '@dashboard/dashboard.component';

// Sub-components
import { ProfileComponent } from '@dashboard/components/profile/profile.component';
import { OrientamentoComponent } from '@dashboard/components/orientamento/orientamento.component';
import { EventComponent } from './components/event/event.component';
import { CategoryComponent } from './components/category/category.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: '', component: ProfileComponent },
			{ path: 'orientamento', component: OrientamentoComponent },
			{ path: 'orientamento/:id', component: EventComponent },
			{ path: 'orders', component: CategoryComponent },
			{ path: 'orders/gadgets', component: OrdersComponent },
			{ path: 'orders/photos', component: OrdersComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
