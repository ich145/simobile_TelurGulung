import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.services';
import { TransactionService } from '../services/transaction.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  totalProduk: number = 0;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.hitungTotalProduk();
  }

  hitungTotalProduk() {
    const listBarang = this.productService.getProducts();
    if (listBarang) {
      this.totalProduk = listBarang.length; // Otomatis ngambil dari service
    }
  }

  getTotalTransaksi(): number {
    return this.transactionService.getTotalHariIni();
  }

  getProdukTerlaris(): string {
    return this.transactionService.getProdukTerlaris();
  }
}
