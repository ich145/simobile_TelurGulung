import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.services';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
  standalone: false,
})
export class LaporanPage implements OnInit {
  totalTransaksiHariIni: number = 0;
  totalPenjualanHariIni: number = 0;
  produkTerlaris: string = '-';

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.refreshReport();
  }

  ionViewWillEnter() {
    this.refreshReport();
  }

  private refreshReport() {
    this.totalTransaksiHariIni = this.transactionService.getTodayCount();
    this.totalPenjualanHariIni = this.transactionService.getTotalHariIni();
    this.produkTerlaris = this.transactionService.getProdukTerlaris();
  }
}
