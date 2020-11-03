import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireStorage } from '@angular/fire/storage';
import { tap } from 'rxjs/operators';

@Injectable()
export class UploadService {
  csvFile: any;
  readyToUploadCsv: boolean;

  imgFiles: Array<any> = [];
  readyToUploadImages: boolean;

  working: boolean;
  sizes: Array<any> = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  onCsvSelect(event) {
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      this.csvFile = file;
      this.readyToUploadCsv = true;
    }
  }

  onCsvUpload() {
    this.working = true;

    const formData = new FormData();
    formData.append('viceCsv', this.csvFile);

    return this.http.post('/api/upload/csv', formData).pipe(
      tap((res) => {
        this.readyToUploadCsv = false;
        this.csvFile = null;
        this.working = false;
      })
    );
  }

  onImgSelect(event) {
    const files = event.target.files;

    for (let file of files) {
      this.imgFiles.push(file);
    }

    this.readyToUploadImages = true;
  }

  async productUpload(form, category, callback) {
    this.working = true;

    const { name, description, price, colors, sizes } = form;
    const selectedSizes = [];

    const id = name.toLowerCase().replace(/ /g, '-');
    const files = this.imgFiles;
    const fileNames = files.map((file) => file.name);

    if (category === 'gadgets') {
      const availableSizes = Object.entries(sizes);

      for (let [key, value] of availableSizes) {
        if (value === true) {
          selectedSizes.push(key);
        }
      }
    }

    const uploadPromises = files.map((file) => {
      let path =
        category === 'gadgets'
          ? `gadgetImages/raw/${file.name}`
          : `photoImages/raw/${file.name}`;

      return this.storage.upload(path, file);
    });

    await Promise.all(uploadPromises);

    if (category === 'gadgets') {
      this.http
        .post(`/api/products/create-gadgets`, {
          id,
          name,
          description,
          price,
          category,
          fileNames,
          colors,
          sizes: selectedSizes,
        })
        .subscribe(callback);
    } else if (category === 'photos') {
      this.http
        .post(`/api/products/create-photos`, {
          id,
          name,
          description,
          price,
          category,
          fileNames,
        })
        .subscribe(callback);
    }
  }
}
