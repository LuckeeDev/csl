import {
	Products,
	ProductsState,
	ProductsStateModel,
} from '@/global/store/products';
import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-store-home',
	templateUrl: './store.view.html',
	styleUrls: ['./store.view.scss'],
})
export class StoreView implements OnInit {
	@Select(ProductsState)
	state$: Observable<ProductsStateModel>;

	links: IDashboardLink[] = [
		{ link: 'gadgets', title: 'Gadget' },
		{ link: 'photos', title: 'Foto' },
	];

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new Products.GetAll());
	}
}
