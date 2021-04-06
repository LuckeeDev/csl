import { AuthService } from '@/global/services/auth/auth.service';
import { ProductsService } from '@/global/services/products/products.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { IProduct } from '@csl/shared';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, retryWhen, switchMap } from 'rxjs/operators';

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
}

export interface ProductsStateModel {
	products: IProduct[];
	loading: boolean;
}

@State<ProductsStateModel>({
	name: 'products',
})
@Injectable()
export class ProductsState {
	constructor(
		private products: ProductsService,
		private afs: AngularFireStorage,
		private _loadingBar: LoadingBarService,
		private auth: AuthService
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

					return forkJoin(productsWithPreview$);
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
				.pipe(retryWhen(() => this.auth.firebaseAuthToken$));
		});

		return forkJoin(links$).pipe(
			map((links) => ({ ...product, previewLinks: links }))
		);
	}
}
