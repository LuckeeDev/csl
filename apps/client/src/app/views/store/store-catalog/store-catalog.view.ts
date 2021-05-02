import { Auth, AuthState } from '@/global/store/auth';
import { PlatformState } from '@/global/store/platform';
import { Products, ProductsState } from '@/global/store/products';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct, PlatformStatus, ProductInUserCart } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, of } from 'rxjs';
import {
	distinctUntilChanged,
	filter,
	map,
	startWith,
	switchMap,
} from 'rxjs/operators';

interface ReadyStatus {
	ready: boolean;
}

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
	statusID = 'store';

	search = new FormControl();

	@Select(AuthState.orderDraft)
	orderDraft$: Observable<ProductInUserCart>;

	@Select(ProductsState.gadgets)
	gadgets$: Observable<IProduct[]>;

	@Select(ProductsState.photos)
	photos$: Observable<IProduct[]>;

	@Select(ProductsState.loading)
	loading$: Observable<boolean>;

	@Select(PlatformState.status)
	platformStatus$: Observable<PlatformStatus[]>;

	readyStatus$: Observable<ReadyStatus>;

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

		const sectionStatus$ = this.platformStatus$.pipe(
			distinctUntilChanged(),
			map((value) => {
				const { status } = value.find((x) => x.id === this.statusID);

				return {
					time: new Date().getTime(),
					start: new Date(status.start).getTime(),
					end: new Date(status.end).getTime(),
				};
			})
		);

		this.readyStatus$ = sectionStatus$.pipe(
			map(({ start, end, time: currentTime }) => {
				const distanceFromStart = start - currentTime;
				const distanceFromEnd = currentTime - end;

				if (distanceFromStart > 0 || distanceFromEnd > 0) {
					return { ready: false };
				} else {
					return { ready: true };
				}
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
						message: 'Prodotto confermato',
					}),
				error: () => this.toastr.showError(),
			});
	}
}
