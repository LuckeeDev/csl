import { ProductsService } from '@/global/services/products/products.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { IProduct } from '@csl/shared';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, map, retryWhen, switchMap, tap } from 'rxjs/operators';
import { AuthState } from '../auth';

export namespace Products {
	/**
	 * Default action to load all available products.
	 */
	export class GetAll {
		static readonly type = '[Products] Get All';
	}

	/**
	 * Load all images for a specific product.
	 */
	export class LoadImages {
		static readonly type = '[Products] Load Images';
		constructor(public id: IProduct['id']) {}
	}

	/**
	 * Reload all products, useful for updating products after
	 * a change.
	 */
	export class Reload {
		static readonly type = '[Products] Reload';
	}

	/**
	 * Create a new product and push to state on success.
	 * @param productForm the value of the form where the user inputs
	 * the product info.
	 * @param category the category of the product which is being created.
	 */
	export class Create {
		static readonly type = '[Products] Create';
		constructor(
			public productForm: IProduct,
			public category: IProduct['category']
		) {}
	}
}

export interface ProductsStateModel {
	products: IProduct[];
	loading: boolean;
}

@State<ProductsStateModel>({
	name: 'products',
	defaults: {
		loading: false,
		products: undefined,
	},
})
@Injectable()
export class ProductsState {
	@Select(AuthState.token)
	authToken$: Observable<string>;

	constructor(
		private products: ProductsService,
		private afs: AngularFireStorage,
		private _loadingBar: LoadingBarService
	) {}

	@Selector()
	static loading(state: ProductsStateModel) {
		return state.loading;
	}

	@Selector()
	static products(state: ProductsStateModel) {
		return state.products;
	}

	@Selector()
	static gadgets(state: ProductsStateModel) {
		return state.products.filter((product) => product.category === 'gadgets');
	}

	@Selector()
	static photos(state: ProductsStateModel) {
		return state.products.filter((product) => product.category === 'photos');
	}

	@Action(Products.GetAll)
	getAllProducts(ctx: StateContext<ProductsStateModel>) {
		const currentState = ctx.getState();

		if (!currentState.products) {
			this._loadAllProducts(ctx);
		}
	}

	@Action(Products.LoadImages)
	loadProductImages(
		ctx: StateContext<ProductsStateModel>,
		action: Products.LoadImages
	) {
		ctx.patchState({ loading: true });

		const currentState = ctx.getState();

		const actionID = action.id;

		const index = currentState.products?.findIndex((x) => x.id === actionID);
		const product = currentState.products ? currentState.products[index] : null;

		if (!currentState.products) {
			this._getProducts()
				.pipe(
					switchMap((products) => {
						const productsWithPreviews$ = products.map((product) => {
							/**
							 * Fetch only one image for all products, unless the product is the one
							 * the user is trying to load.
							 */
							const count =
								product.id === actionID ? product.fileNames.length : 1;

							return this._getImageLinks(product, count);
						});

						return forkJoin(productsWithPreviews$);
					})
				)
				.subscribe((products) => {
					ctx.setState({ products, loading: false });

					this._loadingBar.useRef('http').complete();
				});
		} else if (
			currentState.products[index].previewLinks.length !==
			currentState.products[index].fileNames.length
		) {
			this._getImageLinks(product).subscribe((productWithLinks) => {
				ctx.setState(
					produce(currentState, (state) => {
						state.products[index] = productWithLinks;
						state.loading = false;
					})
				);

				this._loadingBar.useRef('http').complete();
			});
		}
	}

	@Action(Products.Reload)
	reloadProducts(ctx: StateContext<ProductsStateModel>) {
		this._loadAllProducts(ctx);
	}

	@Action(Products.Create)
	createProduct(
		ctx: StateContext<ProductsStateModel>,
		action: Products.Create
	) {
		ctx.patchState({ loading: true });

		return this.products.createGadget(action.productForm, action.category).pipe(
			tap((res) => {
				if (res.success) {
					ctx.setState(
						produce(ctx.getState(), (state) => {
							state.products = [...state.products, res.data];
						})
					);
				} else {
					throw new Error('Non è stato possibile creare il prodotto');
				}

				ctx.patchState({ loading: false });
			})
		);
	}

	/**
	 * Load all products, used both when loading the first time and when reloading.
	 * @param ctx the state context.
	 */
	private _loadAllProducts(ctx: StateContext<ProductsStateModel>) {
		ctx.patchState({ loading: true });

		this._getProducts()
			.pipe(
				switchMap((products) => {
					const productsWithPreview$ = products.map<Observable<IProduct>>(
						(product) => this._getImageLinks(product, 1)
					);

					const result =
						products.length > 0 ? forkJoin(productsWithPreview$) : of([]);

					return result;
				})
			)
			.subscribe((products) => {
				ctx.setState({ products, loading: false });
				this._loadingBar.useRef('http').complete();
			});
	}

	/**
	 * Helper method to call the service's `getAllProducts()` method.
	 * @returns an observable which completes with the list of products.
	 */
	private _getProducts() {
		return this.products.getAllProducts().pipe(
			filter(({ success }) => success === true),
			map(({ data: products }) => products)
		);
	}

	private _getImageLinks(
		product: IProduct,
		count?: number
	): Observable<IProduct> {
		const fileNames = count
			? product.fileNames.slice(0, count)
			: product.fileNames;

		const links$ = fileNames.map<Observable<string>>((fileName) => {
			const folder =
				product.category === 'gadgets' ? 'gadgetImages' : 'photoImages';

			return this.afs
				.ref(`${folder}/${product.id}/${fileName}`)
				.getDownloadURL()
				.pipe(retryWhen(() => this.authToken$));
		});

		return forkJoin(links$).pipe(
			map((links) => ({ ...product, previewLinks: links }))
		);
	}
}
