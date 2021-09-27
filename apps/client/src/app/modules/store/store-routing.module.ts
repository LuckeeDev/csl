import { CategoryComponent } from '@/core/components/category/category.component';
import { RappreDiClasseGuard } from '@/global/guards/rappre-di-classe/rappre-di-classe.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreCatalogView } from './store-catalog/store-catalog.view';
import { StoreClassView } from './store-class/store-class.view';
import { StoreErrorView } from './store-error/store-error.view';
import { StoreHomeView } from './store-home/store-home.view';
import { StoreOrdersView } from './store-orders/store-orders.view';
import { StorePaymentsView } from './store-payments/store-payments.view';
import { StoreProductView } from './store-product/store-product.view';
import { StoreSuccessView } from './store-success/store-success.view';
import { StoreView } from './store.view';

const routes: Routes = [
	{
		path: '',
		component: StoreView,
		children: [
			{ path: '', component: StoreHomeView },
			{
				path: 'summary',
				component: CategoryComponent,
			},
			{
				path: 'summary/gadgets',
				component: StoreOrdersView,
			},
			{
				path: 'summary/photos',
				component: StoreOrdersView,
			},
			{
				path: 'class',
				component: StoreClassView,
				canActivate: [RappreDiClasseGuard],
			},
			{
				path: 'payments',
				component: StorePaymentsView,
				canActivate: [RappreDiClasseGuard],
			},
			{
				path: 'payments/success',
				component: StoreSuccessView,
				canActivate: [RappreDiClasseGuard],
			},
			{
				path: 'payments/error',
				component: StoreErrorView,
				canActivate: [RappreDiClasseGuard],
			},
			{
				path: ':category',
				component: StoreCatalogView,
			},
			{
				path: ':category/:productID',
				component: StoreProductView,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StoreRoutingModule {}
