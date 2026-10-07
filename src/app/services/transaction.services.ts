import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CartItem } from '../models/cart-item.model';
import { ProductService } from './product.services';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor(
    private productService: ProductService
  ) { }

  getTransactions(): Transaction[] {
    return this.transactions;
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
    var copiedItems: CartItem[] = [];
    for (var i = 0; i < items.length; i++) {
      copiedItems.push({ product: items[i].product, quantity: items[i].quantity });
    }
    var newTransaction: Transaction = {
      id: this.transactions.length + 1,
      tanggal: new Date(),
      items: copiedItems,
      total: total
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

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

  private hitungTerjual(namaProduk: string): number {
    var jumlah = 0;
    for (var i = 0; i < this.transactions.length; i++) {
      for (var j = 0; j < this.transactions[i].items.length; j++) {
        if (this.transactions[i].items[j].product.nama == namaProduk) {
          jumlah += this.transactions[i].items[j].quantity;
        }
      }
    }
    return jumlah;
  }

  getProdukTerlaris(): string {
    var daftarProduk = this.productService.getProducts();
    var terlaris = '-';
    var terjualTerbanyak = 0;

    for (var i = 0; i < daftarProduk.length; i++) {
      var terjual = this.hitungTerjual(daftarProduk[i].nama);
      if (terjual > terjualTerbanyak) {
        terjualTerbanyak = terjual;
        terlaris = daftarProduk[i].nama;
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