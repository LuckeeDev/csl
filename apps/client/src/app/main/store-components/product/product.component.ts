import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IImage, IProduct } from '@csl/shared';
import { ProductsService } from '@global/services/products/products.service';
import { OrdersService } from '@global/services/orders/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';

@Component({
  selector: 'csl-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: string;
  product: IProduct;
  images: IImage[];
  category: string;

  orderForm: FormGroup;

  constructor(
    private activated: ActivatedRoute,
    private storage: AngularFireStorage,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.id = this.activated.snapshot.paramMap.get('productID');
    this.category = this.activated.snapshot.paramMap.get('category');

    if (this.category === 'gadgets') {
      this.orderForm = this.fb.group({
        id: [this.id, Validators.required],
        quantity: ['', Validators.required],
        color: ['', Validators.required],
        size: ['', Validators.required],
      });
    } else if (this.category === 'photos') {
      this.orderForm = this.fb.group({
        id: [this.id, Validators.required],
        quantity: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.productsService
      .getProduct(this.id)
      .subscribe(async (res: IProduct) => {
        this.product = res;

        const folder =
          this.category === 'gadgets' ? 'gadgetImages' : 'photoImages';

        const folderRef = this.storage.ref(`/${folder}/${this.product.id}`);

        this.images = [];

        this.product.fileNames.forEach((fileName: string) => {
          folderRef
            .child(fileName)
            .getDownloadURL()
            .subscribe((link: string) => {
              this.images.push({ link });
            });
        });
      });
  }

  get selectedColor(): string {
    return this.orderForm.value.color;
  }

  get carouselReady(): boolean {
    return this.images.length === this.product.fileNames.length;
  }

  selectColor(color: string) {
    if (color === this.orderForm.value.color) {
      this.orderForm.patchValue({ color: '' });
    } else {
      this.orderForm.patchValue({ color });
    }
  }

  addToCart(): void {
    this.dialog
      .open({
        title: 'Sei sicuro di voler ordinare questo prodotto?',
        text:
          'Potrai comunque rivedere i tuoi ordini prima di procedere al pagamento',
        answer: 'Conferma',
        color: 'primary',
      })
      .subscribe(() => {
        this.ordersService.addToCart(this.orderForm.value).subscribe((res) => {
          if (res.success) {
            this.toastr.show({
              message: 'Prodotto aggiunto al carrello',
              color: 'success',
            });

            this.router.navigate(['..', 'store', this.category]);
          } else if ((res.err = 'already-confirmed')) {
            this.toastr.show({
              message: 'Hai già confermato il tuo ordine!',
              color: 'accent',
            });
          } else {
            this.toastr.showError();
          }
        });
      });
  }
}
