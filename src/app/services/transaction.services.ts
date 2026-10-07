import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {}

  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  getTransactionById(id: number): Transaction | undefined {
    for (var i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].id === id) {
        return this.transactions[i];
      }
    }
    return undefined;
  }

  addTransaction(items: CartItem[], total: number): Transaction {
    var newId = this.transactions.length + 1;
    var newTransaction: Transaction = {
      id: newId,
      tanggal: new Date(),
      items: items.map(item => ({
        quantity: item.quantity,
        product: { ...item.product }
      })),
      total: total
    };
    this.transactions = [...this.transactions, newTransaction];
    return newTransaction;
  }

  // Menghitung JUMLAH/FREKUENSI transaksi hari ini
  getTodayCount(): number {
    var hariIni = new Date();
    var count = 0;
    for (var i = 0; i < this.transactions.length; i++) {
      var t = new Date(this.transactions[i].tanggal);
      if (
        t.getDate() === hariIni.getDate() &&
        t.getMonth() === hariIni.getMonth() &&
        t.getFullYear() === hariIni.getFullYear()
      ) {
        count++;
      }
    }
    return count;
  }

  // Menghitung TOTAL NOMINAL PENJUALAN (Rp) hari ini
  getTotalHariIni(): number {
    var hariIni = new Date();
    var total = 0;
    for (var i = 0; i < this.transactions.length; i++) {
      var t = new Date(this.transactions[i].tanggal);
      if (
        t.getDate() === hariIni.getDate() &&
        t.getMonth() === hariIni.getMonth() &&
        t.getFullYear() === hariIni.getFullYear()
      ) {
        total += this.transactions[i].total;
      }
    }
    return total;
  }

  getProdukTerlaris(): string {
    if (this.transactions.length === 0) {
      return '-';
    }

    var rekap: { [nama: string]: number } = {};

    for (var i = 0; i < this.transactions.length; i++) {
      var items = this.transactions[i].items;
      for (var j = 0; j < items.length; j++) {
        var nama = items[j].product.nama;
        var qty = items[j].quantity;
        if (rekap[nama]) {
          rekap[nama] += qty;
        } else {
          rekap[nama] = qty;
        }
      }
    }

    var terlaris = '-';
    var maxQty = 0;

    for (var key in rekap) {
      if (rekap[key] > maxQty) {
        maxQty = rekap[key];
        terlaris = key;
      }
    }

    return terlaris;
  }

  formatTanggal(tanggal: Date): string {
    var d = new Date(tanggal);
    var opsi: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return d.toLocaleDateString('id-ID', opsi);
  }
}