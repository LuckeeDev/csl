import { Auth, AuthState } from '@/global/store/auth';
import { Products, ProductsState } from '@/global/store/products';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductInUserCart } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

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

	@Select(AuthState.orderDraft)
	orderDraft$: Observable<ProductInUserCart>;

	@Select(ProductsState.gadgets)
	gadgets$: Observable<IProduct[]>;

	@Select(ProductsState.photos)
	photos$: Observable<IProduct[]>;

	@Select(ProductsState.loading)
	loading$: Observable<boolean>;

	category: IProduct['category'];
	filteredProducts$: Observable<IProduct[]>;
	productCovers$: Observable<ICover[]>;

	constructor(
		private activated: ActivatedRoute,
		private store: Store,
		private dialog: DialogService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.store.dispatch(new Products.GetAll());

		const products$ = this.activated.paramMap.pipe(
			map((params) => {
				this.category = params.get('category') as IProduct['category'];
				return this.category;
			}),
			switchMap((category) => {
				if (category === 'gadgets') {
					return this.gadgets$;
				} else if (category === 'photos') {
					return this.photos$;
				} else {
					return of(null);
				}
			})
		);

		const search$: Observable<string> = this.search.valueChanges.pipe(
			startWith('')
		);

		this.filteredProducts$ = combineLatest([
			search$,
			products$,
			this.orderDraft$,
		]).pipe(
			filter(([, products]) => (products ? true : false)),
			map(([searchValue, products, orderDraft]) => {
				return products.filter((product) => {
					const lowerSearchValue = searchValue.toLowerCase();

					if (orderDraft !== undefined) {
						return (
							product.discountable === true &&
							(product.name.toLowerCase().includes(lowerSearchValue) ||
								product.description.toLowerCase().includes(lowerSearchValue))
						);
					} else {
						return (
							product.name.toLowerCase().includes(lowerSearchValue) ||
							product.description.toLowerCase().includes(lowerSearchValue)
						);
					}
				});
			})
		);
	}

	confirmWithoutDiscount() {
		this.dialog
			.open({
				title: 'Confermi di voler continuare?',
				answer: 'Conferma',
				color: 'primary',
				text:
					'Confermando, non potrai usufruire dello sconto del 50% sui prodotti selezionati!',
			})
			.pipe(switchMap(() => this.store.dispatch(new Auth.ConfirmDraft())))
			.subscribe({
				next: () =>
					this.toastr.show({
						color: 'basic',
						message: 'Ordine confermato',
					}),
				error: () => this.toastr.showError(),
			});
	}
}
