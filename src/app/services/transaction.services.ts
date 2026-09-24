import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    private transactions: Transaction[] = [];

    constructor() {}

    // Menyimpan transaksi baru
    addTransaction(items: CartItem[], total: number): Transaction {
        const transaction: Transaction = {
        id: this.getNextId(),
        tanggal: new Date().toISOString(),
        items: [...items],
        total: total,
        };

        this.transactions.push(transaction);

        return transaction;
    }

    // Mengambil semua transaksi
    getTransactions(): Transaction[] {
        return this.transactions;
    }

    // Mengambil transaksi berdasarkan ID
    getTransactionById(id: number): Transaction | undefined {
        return this.transactions.find((transaction) => transaction.id === id);
    }

    // Membuat ID transaksi baru
    private getNextId(): number {
        if (this.transactions.length === 0) {
        return 1;
        }

        return (
        Math.max(...this.transactions.map((transaction) => transaction.id)) + 1
        );
    }
}
