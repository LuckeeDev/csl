import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { ProductsService } from '@/global/services/products/products.service';
import { IProduct, TSize } from '@csl/shared';
import { switchMap, tap } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
	selector: 'csl-new-product',
	templateUrl: './new-product.view.html',
	styleUrls: ['./new-product.view.scss'],
})
export class NewProductView {
	category: IProduct['category'];
	sizes: string[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

	productForm = this.fb.group({
		name: ['', Validators.required],
		description: [''],
		price: ['', Validators.required],
		files: ['', Validators.required],
	});

	constructor(
		public products: ProductsService,
		private dialog: DialogService,
		private activated: ActivatedRoute,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _loadingBar: LoadingBarService
	) {
		this.category = this.activated.snapshot.paramMap.get(
			'category'
		) as IProduct['category'];

		if (this.category === 'gadgets') {
			this.productForm.addControl('colors', this.fb.array([]));
			this.productForm.addControl(
				'sizes',
				this.fb.group(
					{
						XXS: [false],
						XS: [false],
						S: [false],
						M: [false],
						L: [false],
						XL: [false],
						XXL: [false],
					},
					[Validators.required]
				)
			);
		}
	}

	// Get colors in Form Group
	get colors() {
		return this.productForm.get('colors') as FormArray;
	}

	get selectedSizesString(): string {
		const form = this.productForm.value as { sizes: Record<TSize, boolean> };

		const sizes = Object.entries(form.sizes) as [TSize, boolean][];

		const result = sizes
			.filter(([, value]) => value === true)
			.map(([size]) => size)
			.join(', ');

		return result;
	}

	// Add a color to the form array
	addColor() {
		this.colors.push(
			this.fb.group({
				color: ['#000000', Validators.required],
				id: ['', Validators.required],
			})
		);
	}

	// Remove a color from the form array
	removeColor(i: number) {
		this.colors.removeAt(i);
	}

	// Handle submit event
	onSubmit() {
		this.dialog
			.open({
				title: 'Confermare la creazione del prodotto?',
				text: 'Non potrai modificarlo in seguito',
				color: 'primary',
				answer: 'Sì, conferma',
			})
			.pipe(
				tap(() => this._loadingBar.useRef('http').start()),
				switchMap(() =>
					this.products.createGadget(this.productForm.value, this.category)
				)
			)
			.subscribe((res) => {
				if (res.success === true) {
					this.toastr.show({
						message: 'Prodotto creato con successo',
						color: 'success',
						action: 'Chiudi',
						duration: 5000,
					});
				} else {
					this.toastr.showError();
				}

				this.productForm.reset();
			});
	}
}
