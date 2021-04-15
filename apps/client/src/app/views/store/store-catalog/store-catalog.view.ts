import { Auth, AuthState } from '@/global/store/auth';
import { Products, ProductsState } from '@/global/store/products';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductInUserCart } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
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

	products$: Observable<IProduct[]>;

	category: IProduct['category'];
	filteredProducts$: Observable<IProduct[]>;
	productCovers$: Observable<ICover[]>;

	constructor(
		private activated: ActivatedRoute,
		private store: Store,
		private router: Router,
		private dialog: DialogService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		const query$ = this.activated.queryParams;

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

		const search$: Observable<string> = this.search.valueChanges.pipe(
			startWith('')
		);

		this.filteredProducts$ = combineLatest([
			search$,
			this.products$,
			query$,
			this.orderDraft$,
		]).pipe(
			filter(([, products]) => (products ? true : false)),
			map(([searchValue, products, query, orderDraft]) => {
				return products.filter((product) => {
					if (query.discountable === 'true' && orderDraft === undefined) {
						this.router.navigate(['./'], { relativeTo: this.activated });

						return (
							product.name.toLowerCase().includes(searchValue) ||
							product.description.toLowerCase().includes(searchValue)
						);
					} else if (query.discountable === 'true') {
						return (
							product.discountable === true &&
							(product.name.toLowerCase().includes(searchValue) ||
								product.description.toLowerCase().includes(searchValue))
						);
					} else {
						return (
							product.name.toLowerCase().includes(searchValue) ||
							product.description.toLowerCase().includes(searchValue)
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
