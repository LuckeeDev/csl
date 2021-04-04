import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@csl/shared';
import { ProductsService } from '@global/services/products/products.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
	search = new FormControl();

	category: string;
	products: IProduct[];
	filteredProducts: Observable<IProduct[]>;
	productCovers: ICover[] = [];

	constructor(
		private activated: ActivatedRoute,
		private productsService: ProductsService,
		private afs: AngularFireStorage
	) {
		this.filteredProducts = this.search.valueChanges.pipe(
			map((value: string | null) => {
				if (value) {
					const filterValue = value.toLowerCase();

					return this.products.filter(
						(x) =>
							x.name.toLowerCase().includes(filterValue) ||
							x.description.toLowerCase().includes(filterValue)
					);
				} else {
					return this.products.slice();
				}
			})
		);
	}

	ngOnInit(): void {
		this.activated.paramMap.subscribe((params) => {
			this.category = params.get('category');

			if (this.category === 'gadgets') {
				this.productsService.getGadgets().subscribe((res) => {
					this.products = res;

					this.products.forEach((product) => {
						this.afs
							.ref(`gadgetImages/${product.id}/${product.fileNames[0]}`)
							.getDownloadURL()
							.subscribe((url) =>
								this.productCovers.push({ url, product: product.id })
							);
					});

					this.search.reset();
				});
			} else if (this.category === 'photos') {
				this.productsService.getPhotos().subscribe((res) => {
					this.products = res;

					this.products.forEach((product) => {
						this.afs
							.ref(`photoImages/${product.id}/${product.fileNames[0]}`)
							.getDownloadURL()
							.subscribe((url) =>
								this.productCovers.push({ url, product: product.id })
							);
					});

					this.search.reset();
				});
			}
		});
	}

	coverImage(id: string) {
		return this.productCovers.find((x) => x.product === id);
	}
}
