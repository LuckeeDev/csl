import { AuthState } from '@/global/store/auth';
import { Orders, OrdersState } from '@/global/store/orders';
import { Products, ProductsState } from '@/global/store/products';
import { calculateTotal } from '@/utils/calculateTotal';
import { Component, OnInit } from '@angular/core';
import {
	CSLDataTableDisplayedColumns,
	CSLDataTableSource,
	IProduct,
	IUser,
} from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface TableData {
	name: IUser['name'];
	total: number;
	gadgets: 'Sì' | 'No';
	photos: 'Sì' | 'No';
}

@Component({
	selector: 'csl-store-class',
	templateUrl: './store-class.view.html',
	styleUrls: ['./store-class.view.scss'],
})
export class StoreClassView implements OnInit {
	@Select(OrdersState.classroom)
	classroom$: Observable<IUser[]>;

	@Select(ProductsState.products)
	products$: Observable<IProduct[]>;

	@Select(AuthState.user)
	user$: Observable<IUser>;

	tableData$: Observable<CSLDataTableSource<TableData>>;

	displayedColumns: CSLDataTableDisplayedColumns<keyof TableData> = [
		{ id: 'name', label: 'Nome', type: 'data' },
		{ id: 'total', label: 'Totale', type: 'data' },
		{ id: 'gadgets', label: 'Gadget Confermati', type: 'data' },
		{ id: 'photos', label: 'Foto Confermate', type: 'data' },
	];

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch([new Orders.GetClassroom(), new Products.GetAll()]);

		this.tableData$ = combineLatest([this.products$, this.classroom$]).pipe(
			filter(([products, users]) => (products && users ? true : false)),
			map(([products, users]) => {
				return users.map(({ id, name, cart, confirmed }) => ({
					id,
					data: {
						name: name,
						total: calculateTotal(products, cart) / 100,
						gadgets: confirmed?.gadgets ? 'Sì' : 'No',
						photos: confirmed?.photos ? 'Sì' : 'No',
					},
				}));
			})
		);
	}
}
