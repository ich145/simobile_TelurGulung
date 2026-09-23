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
  productId: number | null = null;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id') ?? this.findRouteParam('id');
      const parsedId = idParam ? Number(idParam) : 1;

      this.productId = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : 1;
      this.product = this.productService.getProductById(this.productId);
    });
  }

  private findRouteParam(paramName: string): string | null {
    for (const route of this.route.pathFromRoot) {
      const value = route.snapshot.paramMap.get(paramName);

      if (value) {
        return value;
      }
    }

    return null;
  }

  addToCart() {
    if (this.product) {
      console.log('Barang ditambahkan:', this.product.nama);
    }
  }
}
