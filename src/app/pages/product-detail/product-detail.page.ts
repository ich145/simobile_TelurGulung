import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.services';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false 
})
export class ProductDetailPage implements OnInit {
  productId!: number;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.product = this.productService.getProductById(this.productId);
    });
  }

  addToCart() {
    if (this.product) {
      console.log('Barang ditambahkan:', this.product.nama);
    }
  }
}