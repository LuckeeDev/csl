import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { ProductsService } from '@/global/services/products/products.service';
import { IProduct } from '@csl/shared';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'csl-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
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
		private router: Router
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
			});
	}
}
