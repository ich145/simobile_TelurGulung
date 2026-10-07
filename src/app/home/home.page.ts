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
  totalTransaksiHariIni: number = 0; // Frekuensi Transaksi
  totalPenjualanHariIni: number = 0; // Total Nominal Rp
  produkTerlaris: string = '-';
  today: Date = new Date();

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.refreshDashboardData();
  }

  // WAJIB: dipanggil setiap kali Tab Dashboard dibuka
  ionViewDidEnter() {
    this.refreshDashboardData();
  }

  refreshDashboardData() {
    this.today = new Date();
    
    // 1. Jumlah jenis produk
    const listBarang = this.productService.getProducts();
    this.totalProduk = listBarang ? listBarang.length : 0;

    // 2. Jumlah transaksi & total Rp hari ini dari TransactionService
    this.totalTransaksiHariIni = this.transactionService.getTodayCount();
    this.totalPenjualanHariIni = this.transactionService.getTotalHariIni();
    this.produkTerlaris = this.transactionService.getProdukTerlaris();
  }
}