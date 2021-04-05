import { Products } from '@/global/store/products';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
	selector: 'csl-store-home',
	templateUrl: './store-home.view.html',
	styleUrls: ['./store-home.view.scss'],
})
export class StoreHomeView implements OnInit {
	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new Products.GetAll());
	}
}
