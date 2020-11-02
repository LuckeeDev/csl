import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductOptions, ProductResInterface } from '@global/@types/product';
import { ProductsService } from '@global/services/products/products.service';
import { OrdersService } from '@global/services/orders/orders.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@global/ui/services/dialog/dialog.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: string;
  product: any;
  imageLinks: string[] = [];
  category: string;

  productOptions: ProductOptions = new ProductOptions();

  orderForm = this.fb.group({
    quantity: ['', Validators.required],
    color: ['', Validators.required],
    size: ['', Validators.required],
  });

  loading: boolean;

  constructor(
    private activated: ActivatedRoute,
    private storage: AngularFireStorage,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) {}

  // Get product on component initialization
  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
      this.id = params.get('productID');
      this.category = params.get('category');

      this.productsService.getProduct(this.id, async (res) => {
        this.product = res;

        const folder =
          this.category === 'gadgets' ? 'gadgetImages' : 'photoImages';

        const folderRef = this.storage.ref(`/${folder}/${this.product.id}`);

        await this.product.fileNames.forEach((fileName) => {
          folderRef
            .child(fileName)
            .getDownloadURL()
            .subscribe((res) => {
              this.imageLinks.push(res);
            });
        });
      });
    });
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
        this.productOptions.id = this.id;

        this.ordersService.addToCart(
          this.productOptions,
          (res: ProductResInterface) => {
            if (res.success) {
              console.log(res.msg);
            } else {
              alert(res.err);
            }

            this.loading = false;
          }
        );
      });
  }
}
