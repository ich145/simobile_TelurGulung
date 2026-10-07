import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.services';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: false,
})
export class TransactionDetailPage implements OnInit {

  transaction?: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.loadDetail();
  }

  ionViewDidEnter() {
    this.loadDetail();
  }

  loadDetail() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 0;
    this.transaction = this.transactionService.getTransactionById(id);
  }

  formatTanggal(tanggal?: Date): string {
    if (!tanggal) {
      return '-';
    }
    return this.transactionService.formatTanggal(tanggal);
  }
}