import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  totalProduk: number = 0;
  totalTransaksi: number = 0;
  produkTerlaris: string = '-';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.hitungTotalProduk();
  }

  hitungTotalProduk() {
    const listBarang = this.productService.getProducts();
    if (listBarang) {
      this.totalProduk = listBarang.length; // Otomatis ngambil dari service
    }
  }
}
