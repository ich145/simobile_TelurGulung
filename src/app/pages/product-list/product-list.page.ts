import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: false,
})
export class ProductListPage implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  goToDetail(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }
  goToAddProduct() {
    this.router.navigate(['/product-form']);
  }
  
  ngOnInit() {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = [...this.allProducts];
  }

  filterProducts(event?: CustomEvent) {
    const value = event?.detail?.value ?? this.searchTerm;
    this.searchTerm = value;
    const term = this.normalizeText(value);

    if (!term) {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter((product) =>
        this.normalizeText(product.nama).startsWith(term),
      );
    }
  }

  private normalizeText(value: string): string {
    return value.toLowerCase().trim().replace(/\s+/g, ' ');
  }
}
