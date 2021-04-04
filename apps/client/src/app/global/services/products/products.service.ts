import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { IHttpRes, IProduct, TSize } from '@csl/shared';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, map, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private _imgFiles: File[] = [];

	constructor(private http: HttpClient, private afs: AngularFireStorage) {}

	/**
	 * Make file list available only as a getter property
	 */
	get imgFiles() {
		return this._imgFiles;
	}

	getGadgets(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>('/products/gadgets');
	}

	getPhotos(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>('/products/photos');
	}

	getProduct(id: string) {
		return this.http.post('/products/find', { id });
	}

	deleteProduct(id: string): Observable<IHttpRes<void>> {
		return this.http.delete<IHttpRes<void>>(`/products/${id}`);
	}

	createGadget(form: IProduct, category: IProduct['category']) {
		const { name, description, price, colors } = form;

		const sizes = (form.sizes as unknown) as Record<TSize, boolean>;

		const id = name.toLowerCase().replace(/ /g, '-');
		const files = this._imgFiles;

		const availableSizes = Object.entries(sizes) as [TSize, boolean][];

		const selectedSizes: IProduct['sizes'] = availableSizes
			.filter(([, value]) => value === true)
			.map(([key]) => key);

		const uploads$ = files.map((file) => {
			const path = `gadgetImages/raw/${file.name}`;

			/**
			 * Take only last value (when upload task completes)
			 * and return file name
			 */
			return this.afs
				.upload(path, file)
				.snapshotChanges()
				.pipe(
					last(),
					map(() => file.name)
				);
		});

		/**
		 * Wait for all upload tasks to complete and then fire
		 * HTTP request to create product with the returned file
		 * names
		 */
		return forkJoin(uploads$).pipe(
			switchMap((fileNames) =>
				this.http.post<IHttpRes<IProduct>>(`/products/create-gadgets`, {
					id,
					name,
					description,
					price,
					category,
					fileNames,
					colors,
					sizes: selectedSizes,
				})
			)
		);
	}

	onImgSelect(event: Event) {
		const t = event.target as EventTarget & { files: File[] };
		const files = t.files;

		this._imgFiles.push(...files);
	}
}
