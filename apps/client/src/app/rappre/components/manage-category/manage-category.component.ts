import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@global/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { IProduct } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { Select, Store } from '@ngxs/store';
import { Products, ProductsState } from '@/global/store/products';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-manage-category',
	templateUrl: './manage-category.component.html',
	styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit {
	category: string;
	displayedColumns: string[];

	@Select(ProductsState.products)
	availableProducts$: Observable<IProduct[]>;

	products$: Observable<IProduct[]>;

	constructor(
		private productsService: ProductsService,
		private activated: ActivatedRoute,
		private dialog: DialogService,
		private toastr: ToastrService,
		private store: Store
	) {}

	ngOnInit(): void {
		this.store.dispatch(new Products.GetAll());

		this.products$ = this.activated.paramMap.pipe(
			map((params) => params.get('category') as IProduct['category']),
			tap((category) => {
				this.category = category;

				this.displayedColumns =
					category === 'gadgets'
						? ['name', 'description', 'price', 'sizes', 'colors', 'options']
						: ['name', 'description', 'price', 'options'];
			}),
			switchMap((category) =>
				this.availableProducts$.pipe(
					filter((products) => (products ? true : false)),
					map((products) => products.filter((x) => x.category === category))
				)
			)
		);
	}

	deleteProduct(id: IProduct['id']) {
		this.dialog
			.open({
				title: 'Sei sicuro di voler eliminare questo prodotto?',
				text:
					'Tutti gli studenti che hanno acquistato questo prodotto perderanno il loro ordine.',
				color: 'warn',
				answer: 'Sì, elimina prodotto',
			})
			.subscribe(() => {
				this.productsService.deleteProduct(id).subscribe((res) => {
					if (res.success === true) {
						this.toastr.show({
							message: 'Prodotto eliminato',
							color: 'accent',
							action: 'Chiudi',
							duration: 5000,
						});

						this.store.dispatch(new Products.Reload());
					} else if (res.success === false) {
						this.toastr.showError();
					}
				});
			});
	}

	displayColumn(column: string) {
		return this.displayedColumns.includes(column);
	}
}
