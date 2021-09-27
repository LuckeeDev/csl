// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// UI
import { UiModule } from '@csl/ui';

// Pipes
import { PipesModule } from '@/global/pipes/pipes.module';

// Module imports
import { StoreRoutingModule } from './store-routing.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { ProductsState } from '@/global/store/products';
import { OrdersState } from '@/global/store/orders';
import { PlatformState } from '@/global/store/platform';

// Views
import { StoreCatalogView } from './store-catalog/store-catalog.view';
import { StoreErrorView } from './store-error/store-error.view';
import { StoreHomeView } from './store-home/store-home.view';
import { StoreOrdersView } from './store-orders/store-orders.view';
import { StorePaymentsView } from './store-payments/store-payments.view';
import { StoreProductView } from './store-product/store-product.view';
import { StoreSuccessView } from './store-success/store-success.view';
import { StoreView } from './store.view';
import { StoreClassView } from './store-class/store-class.view';

@NgModule({
	declarations: [
		StoreCatalogView,
		StoreErrorView,
		StoreHomeView,
		StoreOrdersView,
		StorePaymentsView,
		StoreProductView,
		StoreSuccessView,
		StoreView,
		StoreClassView,
	],
	imports: [
		CommonModule,
		StoreRoutingModule,
		NgxsModule.forFeature([
			AuthState,
			ProductsState,
			OrdersState,
			PlatformState,
		]),
		UiModule,
		ReactiveFormsModule,
		PipesModule,
	],
})
export class StoreModule {}
