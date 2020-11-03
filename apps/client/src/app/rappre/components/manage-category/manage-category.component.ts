import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@global/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IProduct } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit {
  category: string;
  products: IProduct[];
  displayedColumns: string[];

  constructor(
    private productsService: ProductsService,
    private activated: ActivatedRoute,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activated.paramMap
      .pipe(map((params) => params.get('category')))
      .subscribe((value) => {
        this.category = value;

        if (value === 'gadgets') {
          this.displayedColumns = [
            'id',
            'name',
            'description',
            'price',
            'sizes',
            'colors',
            'options',
          ];

          this.productsService.getGadgets().subscribe((res: IProduct[]) => {
            this.products = res;
          });
        } else if (value === 'photos') {
          this.displayedColumns = [
            'id',
            'name',
            'description',
            'price',
            'options',
          ];

          this.productsService.getPhotos().subscribe((res: IProduct[]) => {
            this.products = res;
          });
        }
      });
  }

  deleteProduct(id) {
    this.dialog
      .open({
        title: 'Sei sicuro di voler eliminare questo prodotto?',
        text: 'Potrai ricrearlo dalla pagina per la creazione dei prodotti',
        color: 'warn',
        answer: 'Sì, elimina prodotto',
      })
      .subscribe((res) => {
        this.productsService.deleteProduct(id).subscribe((res) => {
          if (res.success === true) {
            this.toastr.show({
              message: 'Prodotto eliminato',
              action: 'Chiudi',
              duration: 5000,
            });

            if (this.category === 'gadgets') {
              this.productsService
                .getGadgets()
                .subscribe((res) => (this.products = res));
            } else if (this.category === 'photos') {
              this.productsService
                .getPhotos()
                .subscribe((res) => (this.products = res));
            }
          } else if (res.success === false) {
            this.toastr.showError();
          }
        });
      });
  }

  displayColumn(column) {
    return this.displayedColumns.includes(column);
  }
}
