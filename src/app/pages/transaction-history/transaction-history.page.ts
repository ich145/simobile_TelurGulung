import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.services';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
export class TransactionHistoryPage implements OnInit {

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.refreshTransactions();
  }

  ionViewDidEnter() {
    this.refreshTransactions();
  }

  refreshTransactions() {
    this.transactions = this.transactionService.getTransactions();
  }

  formatTanggal(tanggal: Date): string {
    return this.transactionService.formatTanggal(tanggal);
  }
}