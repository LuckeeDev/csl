import { Products, ProductsState } from '@/global/store/products';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ICover {
	url: string;
	product: string;
}

@Component({
	selector: 'csl-store-catalog',
	templateUrl: './store-catalog.view.html',
	styleUrls: ['./store-catalog.view.scss'],
})
export class StoreCatalogView implements OnInit {
	search = new FormControl();

	@Select(ProductsState.gadgets)
	gadgets$: Observable<IProduct[]>;

	@Select(ProductsState.photos)
	photos$: Observable<IProduct[]>;

	products$: Observable<IProduct[]>;

	category: IProduct['category'];
	filteredProducts$: Observable<IProduct[]>;
	productCovers$: Observable<ICover[]>;

	constructor(private activated: ActivatedRoute, private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(new Products.GetAll());

		this.activated.paramMap.subscribe((params) => {
			this.category = params.get('category') as IProduct['category'];

			if (this.category === 'gadgets') {
				this.products$ = this.gadgets$;
			} else if (this.category === 'photos') {
				this.products$ = this.photos$;
			}

			this.search.reset();
		});

		const search$: Observable<string> = this.search.valueChanges;

		this.filteredProducts$ = combineLatest([search$, this.products$]).pipe(
			map(([searchValue, products]) => {
				return products.filter(
					(product) =>
						product.name.toLowerCase().includes(searchValue) ||
						product.description.toLowerCase().includes(searchValue)
				);
			})
		);
	}
}
