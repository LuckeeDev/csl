import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { IImage, IProduct } from '@csl/shared';
import { ProductsService } from '@global/services/products/products.service';
import { OrdersService } from '@global/services/orders/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@csl/ui';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: string;
  product: IProduct;
  images: IImage[];
  category: string;

  orderForm: FormGroup;

  loading: boolean;

  constructor(
    private activated: ActivatedRoute,
    private storage: AngularFireStorage,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) {
    this.id = this.activated.snapshot.paramMap.get('productID');
    this.category = this.activated.snapshot.paramMap.get('category');

    this.orderForm = this.fb.group({
      id: [this.id, Validators.required],
      quantity: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
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
    });
  }

  get carouselReady(): boolean {
    return this.images.length === this.product.fileNames.length;
  }

  // Add product to cart
  addToCart(): void {
    this.dialog
      .open({
        title: 'Sei sicuro di voler ordinare questo prodotto?',
        text:
          'Potrai comunque rivedere i tuoi ordini prima di procedere al pagamento',
        answer: 'Conferma',
        color: 'primary',
      })
      .subscribe((res) => {
        this.loading = true;

        this.ordersService.addToCart(this.orderForm.value).subscribe((res) => {
          if (res.success) {
            console.log(res.msg);
          } else {
            alert(res.err);
          }

          this.loading = false;
        });
      });
  }
}
