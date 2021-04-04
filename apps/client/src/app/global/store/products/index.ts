import { ProductsService } from '@/global/services/products/products.service';
import { Injectable } from '@angular/core';
import { IProduct } from '@csl/shared';
import { Action, State, StateContext } from '@ngxs/store';

export namespace Products {
	export class GetAll {
		static readonly type = '[Products] Get All';
	}
}

interface ProductsStateModel {
	products: IProduct[];
	loading: boolean;
}

@State<ProductsStateModel>({
	name: 'products',
})
@Injectable()
export class ProductsState {
	constructor(private products: ProductsService) {}

	@Action(Products.GetAll)
	getAllProducts(ctx: StateContext<ProductsStateModel>) {
		this.products.getGadgets().subscribe((products) => {
			ctx.patchState({ products });
		});
	}
}
