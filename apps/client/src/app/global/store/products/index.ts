import { ProductsService } from '@/global/services/products/products.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { IProduct } from '@csl/shared';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, last, map, switchMap } from 'rxjs/operators';

export namespace Products {
	export class GetAll {
		static readonly type = '[Products] Get All';
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
		private afs: AngularFireStorage
	) {}

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
							const folder = product.category === 'gadgets' ? 'gadgetImages' : 'photoImages';

							return this.afs
								.ref(`${folder}/${product.id}/${product.fileNames[0]}`)
								.getDownloadURL()
								.pipe(
									last(),
									map((link) => ({ ...product, previewLink: link }))
								);
						}
					);

					return forkJoin(productsWithPreview$);
				})
			)
			.subscribe((products) => {
				ctx.setState({ products, loading: false });
			});
	}
}
