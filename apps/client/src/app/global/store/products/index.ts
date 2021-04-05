import { ProductsService } from '@/global/services/products/products.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { IProduct } from '@csl/shared';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { forkJoin, Observable } from 'rxjs';
import { filter, last, map, switchMap } from 'rxjs/operators';

export namespace Products {
	export class GetAll {
		static readonly type = '[Products] Get All';
	}

	export class LoadImages {
		static readonly type = '[Products] Load Images';
		constructor(public id: IProduct['id']) {}
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
		private _loadingBar: LoadingBarService
	) {}

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
		ctx.patchState({ loading: true });

		this.products
			.getAllProducts()
			.pipe(
				filter(({ success }) => success === true),
				switchMap(({ data: products }) => {
					const productsWithPreview$ = products.map<Observable<IProduct>>(
						(product) => {
							const folder =
								product.category === 'gadgets' ? 'gadgetImages' : 'photoImages';

							return this.afs
								.ref(`${folder}/${product.id}/${product.fileNames[0]}`)
								.getDownloadURL()
								.pipe(
									last(),
									map((link: string) => ({ ...product, previewLinks: [link] }))
								);
						}
					);

					return forkJoin(productsWithPreview$);
				})
			)
			.subscribe((products) => {
				ctx.setState({ products, loading: false });
				this._loadingBar.useRef('http').complete();
			});
	}

	@Action(Products.LoadImages)
	loadProductImages(
		ctx: StateContext<ProductsStateModel>,
		action: Products.LoadImages
	) {
		ctx.patchState({ loading: true });

		const currentState = ctx.getState();
		const index = currentState.products.findIndex((x) => x.id === action.id);
		const product = currentState.products[index];

		const links$ = product.fileNames.map<Observable<string>>((fileName) => {
			const folder =
				product.category === 'gadgets' ? 'gadgetImages' : 'photoImages';

			return this.afs
				.ref(`${folder}/${product.id}/${fileName}`)
				.getDownloadURL();
		});

		forkJoin(links$).subscribe((links) => {
			ctx.setState(
				produce(currentState, (state) => {
					state.products[index].previewLinks = links;
				})
			);
		});
	}
}
