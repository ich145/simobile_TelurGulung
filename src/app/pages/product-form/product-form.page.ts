import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.services';
import { Product } from '../../models/product.model';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: false,
})
export class ProductFormPage implements OnInit {

  productForm!: FormGroup;

  isEditMode = false;
  productId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    // Membuat Reactive Form
    this.productForm = this.formBuilder.group({
      nama: ['', Validators.required],

      hargaBeli: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      hargaJual: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      stok: [
        null,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      kategori: ['', Validators.required],

      urlGambar: ['']
    });

    // Mengecek apakah sedang Edit atau Tambah
    this.route.paramMap.subscribe(params => {

      const idParam = params.get('id');

      if (idParam) {
        this.isEditMode = true;
        this.productId = Number(idParam);

        this.loadProduct(this.productId);
      }
    });
  }

  // Mengambil data produk untuk mode Edit
  loadProduct(id: number) {

    const product = this.productService.getProductById(id);

    if (!product) {
      return;
    }

    this.productForm.patchValue({
      nama: product.nama,
      hargaBeli: product.hargaBeli,
      hargaJual: product.hargaJual,
      stok: product.stok,
      kategori: product.kategori,
      urlGambar: product.urlGambar
    });
  }

  // Mengecek apakah field sedang error
  isInvalid(fieldName: string): boolean {

    const field = this.productForm.get(fieldName);

    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched)
    );
  }

  // Simpan produk
  saveProduct() {

    // Jika form tidak valid
    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;
    }

    const formValue = this.productForm.value;

    // MODE EDIT
    if (this.isEditMode && this.productId !== null) {

      const updatedProduct: Product = {
        id: this.productId,
        nama: formValue.nama,
        hargaBeli: formValue.hargaBeli,
        hargaJual: formValue.hargaJual,
        stok: formValue.stok,
        kategori: formValue.kategori,
        urlGambar: formValue.urlGambar || ''
      };

      this.productService.updateProduct(updatedProduct);

    }

    // MODE TAMBAH
    else {

      const newProduct: Product = {
        id: this.productService.getNextId(),
        nama: formValue.nama,
        hargaBeli: formValue.hargaBeli,
        hargaJual: formValue.hargaJual,
        stok: formValue.stok,
        kategori: formValue.kategori,
        urlGambar: formValue.urlGambar || ''
      };

      this.productService.addProduct(newProduct);
    }

    // Kembali ke daftar produk
    this.router.navigate(['/product-list']);
  }

  // Membatalkan form
  cancel() {
    this.router.navigate(['/product-list']);
  }
  animateForm() {
    const formElement = document.querySelector('#productFormAnimation') as HTMLElement;

    if (!formElement) {
      return;
    }

    const animation = this.animationCtrl
      .create()
      .addElement(formElement)
      .duration(700)
      .keyframes([
        {
          offset: 0,
          opacity: '0',
          transform: 'translateY(30px)'
        },
        {
          offset: 1,
          opacity: '1',
          transform: 'translateY(0)'
        }
      ]);

    animation.play();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.animateForm();
    }, 50);
  }
}