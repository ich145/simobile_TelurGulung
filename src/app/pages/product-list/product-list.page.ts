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
  
  ngOnInit() {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = [...this.allProducts];
  }

  filterProducts() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter((product) =>
        product.nama.toLowerCase().includes(term),
      );
    }
  }
}
