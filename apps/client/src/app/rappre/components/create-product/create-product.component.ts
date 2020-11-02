import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from '@global/ui/services/toastr/toastr.service';
import { DialogService } from '@global/ui/services/dialog/dialog.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  faTimes = faTimes;

  category: string;
  sizes: Array<String> = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: ['', Validators.required],
    files: ['', Validators.required],
  });

  constructor(
    public upload: UploadService,
    private dialog: DialogService,
    private activated: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.category = this.activated.snapshot.paramMap.get('category');

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

  ngOnInit(): void {}

  // Get colors in Form Group
  get colors() {
    return this.productForm.get('colors') as FormArray;
  }

  // Add a color to the form array
  addColor() {
    this.colors.push(this.fb.control('#000000'));
  }

  // Remove a color from the form array
  removeColor(i) {
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
      .subscribe((res) => {
        this.upload.productUpload(
          this.productForm.value,
          this.category,
          (res) => {
            this.upload.working = false;
            this.upload.imgFiles = [];
            this.upload.readyToUploadImages = false;

            this.router.navigate(['rappre', this.category]);

            this.toastr.show({
              message: 'Prodotto creato con successo',
              action: 'Chiudi',
              duration: 5000,
            });
          }
        );
      });
  }
}
