import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CartItem } from '../models/cart-item.model';
import { ProductService } from './product.services';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    private transactions: Transaction[] = [];

    constructor(
        private productService: ProductService
    ) { }

    addTransaction(items: CartItem[], total: number): Transaction {
        var copiedItems: CartItem[] = [];
        for (var i = 0; i < items.length; i++) {
            copiedItems.push(items[i]);
        }

        const transaction: Transaction = {
            id: this.getNextId(),
            tanggal: new Date(),
            items: copiedItems,
            total: total,
        };

        this.transactions.push(transaction);
        return transaction;
    }

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

    private getNextId(): number {
        if (this.transactions.length === 0) {
            return 1;
        }
        var maxId = 0;
        for (var i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id > maxId) {
                maxId = this.transactions[i].id;
            }
        }
        return maxId + 1;
    }

    formatTanggal(tanggal: Date): string {
        var arrayOfMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        var d = tanggal.getDate();
        var m = tanggal.getMonth();
        var y = tanggal.getFullYear();
        var h = tanggal.getHours();
        var i = tanggal.getMinutes();

        var jamStr = h < 10 ? '0' + h : '' + h;
        var menitStr = i < 10 ? '0' + i : '' + i;

        return d + ' ' + arrayOfMonths[m] + ' ' + y + ', ' + jamStr + ':' + menitStr;
    }

    getTotalHariIni(): number {
        var hariIni = new Date();
        var total = 0;
        for (var i = 0; i < this.transactions.length; i++) {
            var t = this.transactions[i].tanggal;
            if (t.getDate() == hariIni.getDate() &&
                t.getMonth() == hariIni.getMonth() &&
                t.getFullYear() == hariIni.getFullYear()) {
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
}