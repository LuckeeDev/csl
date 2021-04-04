import { ProductsService } from '@/global/services/products/products.service';
import { Injectable } from '@angular/core';
import { IProduct } from '@csl/shared';
import { Action, Selector, State, StateContext } from '@ngxs/store';

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
	constructor(private products: ProductsService) {}

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

		this.products.getAllProducts().subscribe(({ success, data: products }) => {
			if (success === true) {
				ctx.setState({ products, loading: false });
			}
		});
	}
}
