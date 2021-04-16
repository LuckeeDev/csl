import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { ProductsService } from '@/global/services/products/products.service';
import { IProduct, TSize } from '@csl/shared';
import { switchMap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Products, ProductsState } from '@/global/store/products';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-new-product',
	templateUrl: './new-product.view.html',
	styleUrls: ['./new-product.view.scss'],
})
export class NewProductView implements OnInit {
	@Select(ProductsState.loading)
	loading$: Observable<boolean>;

	category: IProduct['category'];
	sizes: TSize[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'U'];

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
		private store: Store
	) {}

	ngOnInit() {
		this.store.dispatch(new Products.GetAll());

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
						'3XL': [false],
						U: [false],
					},
					[Validators.required]
				)
			);
			this.productForm.addControl('discountable', this.fb.control(false));
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

	get uploadedImagesString(): string {
		return this.products.imgFiles.map((file) => file.name).join(', ');
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
	onSubmit(formElement: HTMLFormElement) {
		this.dialog
			.open({
				title: 'Confermare la creazione del prodotto?',
				text: 'Non potrai modificarlo in seguito',
				color: 'primary',
				answer: 'Sì, conferma',
			})
			.pipe(
				switchMap(() =>
					this.store.dispatch(
						new Products.Create(this.productForm.value, this.category)
					)
				)
			)
			.subscribe({
				next: () => {
					this.toastr.show({
						message: 'Prodotto creato con successo',
						color: 'success',
						action: 'Chiudi',
						duration: 5000,
					});

					this._resetForm(formElement);
				},
				error: (err) => this.toastr.showError(err),
			});
	}

	private _resetForm(formElement: HTMLFormElement) {
		this.products.resetImages();

		const colors: IProduct['colors'][number][] = this.colors.value;

		colors.forEach(() => this.colors.removeAt(0));

		formElement.reset();
		this.productForm.reset();
	}
}
