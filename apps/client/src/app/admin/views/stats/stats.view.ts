import { Products, ProductsState } from '@/global/store/products';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
	CSLDataTableDisplayedColumns,
	CSLDataTableSource,
	IHttpRes,
	IProduct,
	IUser,
	reduceCart,
} from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface ClassData {
	classID: string;
	total: string;
}

@Component({
	selector: 'csl-stats',
	templateUrl: './stats.view.html',
	styleUrls: ['./stats.view.scss'],
})
export class StatsView implements OnInit {
	@Select(ProductsState.gadgets)
	gadgets$: Observable<IProduct[]>;

	users$: Observable<IUser[]>;

	private _usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

	tableData$: Observable<CSLDataTableSource<ClassData>>;

	displayedColumns: CSLDataTableDisplayedColumns<keyof ClassData> = [
		{ id: 'classID', label: 'Classe', type: 'data' },
		{ id: 'total', label: 'Totale', type: 'data' },
	];

	constructor(private http: HttpClient, private store: Store) {}

	ngOnInit(): void {
		this.users$ = this._usersSubject$.asObservable();

		this.http.get<IHttpRes<IUser[]>>('/users/all').subscribe((res) => {
			if (res.success) {
				this._usersSubject$.next(res.data);
			}
		});

		this.store.dispatch(new Products.GetAll());

		this.tableData$ = combineLatest([this.gadgets$, this.users$]).pipe(
			filter(([gadgets, users]) => (gadgets && users ? true : false)),
			map(([gadgets, users]) => ({
				gadgets,
				users: users.map(({ cart, classID }) => ({
					classID,
					cart: reduceCart(cart),
				})),
			})),
			map(({ gadgets, users }) => {
				const usersWithTotal = users
					.filter(({ cart }) => (cart && cart.length > 0 ? true : false))
					.map(({ classID, cart }) => {
						const total = cart.reduce((acc, current) => {
							const discountFactor = current.discounted ? 0.5 : 1;

							const product = gadgets.find((x) => x.id === current.id);

							const price = product.price * current.quantity * discountFactor;

							return acc + price;
						}, 0);

						return { classID, total };
					});

				const classes = usersWithTotal.reduce(
					(acc: { classID: string; total: number }[], current) => {
						const index = acc.findIndex((x) => x.classID === current.classID);

						if (index === -1) {
							acc.push(current);
						} else {
							acc[index].total = current.total + acc[index].total;
						}

						return acc;
					},
					[]
				);

				return classes
					.map(({ classID, total }) => ({ classID, total: `${total / 100}€` }))
					.sort((a, b) =>
						a.classID > b.classID ? 1 : b.classID > a.classID ? -1 : 0
					);
			}),
			map((data) =>
				data.map((classData) => ({ id: classData.classID, data: classData }))
			)
		);
	}
}
